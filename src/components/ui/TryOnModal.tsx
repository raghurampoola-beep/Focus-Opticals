"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Camera, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  productName: string;
}

declare global {
  interface Window {
    FaceMesh: any;
  }
}

type Stage = 'preview' | 'processing' | 'result' | 'error';

export const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, onClose, productImage, productName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceMeshRef = useRef<any>(null);

  const [stage, setStage] = useState<Stage>('preview');
  const [errorMsg, setErrorMsg] = useState('');
  const [camerasLoading, setCamerasLoading] = useState(true);
  const [preloadedGlasses, setPreloadedGlasses] = useState<HTMLCanvasElement | null>(null);

  // Start camera and preload assets on open
  useEffect(() => {
    if (!isOpen) return;
    setStage('preview');
    setCamerasLoading(true);
    setErrorMsg('');

    // Preload glasses image
    loadGlassesImage(productImage).then(canvas => {
      setPreloadedGlasses(canvas);
    });

    // Warm up FaceMesh scripts
    loadFaceMesh().catch(err => {
      console.error("FaceMesh preload failed", err);
    });

    let activeStream: MediaStream | null = null;

    navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'user', 
        width: { ideal: 1280 }, 
        height: { ideal: 720 } 
      }
    }).then(stream => {
      activeStream = stream;
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Use a promise-based play check to avoid race conditions
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setCamerasLoading(false);
          }).catch(error => {
            console.error("Video play failed:", error);
            setCamerasLoading(false);
          });
        }
      }
    }).catch((err) => {
      console.error("Camera access error:", err);
      setErrorMsg('Camera access denied. Please allow camera permission and try again.');
      setStage('error');
      setCamerasLoading(false);
    });

    return () => {
      stopCamera();
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isOpen, productImage]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const loadFaceMesh = async () => {
    if (window.FaceMesh) return;

    const scripts = [
      'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js',
    ];

    for (const src of scripts) {
      if (!document.querySelector(`script[src="${src}"]`)) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = src;
          s.onload = () => resolve();
          s.onerror = () => reject();
          document.head.appendChild(s);
        });
      }
    }
  };

  const handleCapture = useCallback(async () => {
    if (!videoRef.current || !resultCanvasRef.current) return;
    setStage('processing');
    stopCamera();

    // Snapshot the video frame
    const video = videoRef.current;
    const W = video.videoWidth || 640;
    const H = video.videoHeight || 480;

    // Snapshot canvas (unmirrored for detection)
    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = W;
    snapCanvas.height = H;
    const snapCtx = snapCanvas.getContext('2d')!;
    snapCtx.drawImage(video, 0, 0, W, H);

    // Use preloaded glasses or load now if not ready
    const glassesCanvas = preloadedGlasses || await loadGlassesImage(productImage);

    try {
      await loadFaceMesh();

      const faceMesh = new window.FaceMesh({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      });
      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      faceMeshRef.current = faceMesh;

      faceMesh.onResults((results: any) => {
        const canvas = resultCanvasRef.current!;
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d')!;

        // Draw mirrored photo
        ctx.save();
        ctx.translate(W, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(snapCanvas, 0, 0, W, H);
        ctx.restore();

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const lm = results.multiFaceLandmarks[0];

          // Mirror the X coordinate for display
          const pt = (idx: number) => ({
            x: (1 - lm[idx].x) * W,   // mirror X
            y: lm[idx].y * H,
          });

          // Key points:
          // 33 = left eye outer, 263 = right eye outer (mirrored: 33=right, 263=left)
          // 168 = nose bridge top center
          // 6 = mid nose between eyes
          const leftOuter = pt(263);
          const rightOuter = pt(33);
          const nosePt = pt(6);

          const dx = rightOuter.x - leftOuter.x;
          const dy = rightOuter.y - leftOuter.y;
          const angle = Math.atan2(dy, dx);
          const eyeSpan = Math.hypot(dx, dy);

          // Glasses proportional width (wider than just eye-to-eye)
          const glassesW = eyeSpan * 2.1;
          const glassesH = glassesW * (glassesCanvas.height / glassesCanvas.width);

          // Center: midpoint between two eye outers
          const cx = (leftOuter.x + rightOuter.x) / 2;
          const cy = (leftOuter.y + rightOuter.y) / 2;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.globalAlpha = 1;
          ctx.drawImage(
            glassesCanvas,
            -glassesW / 2,
            -glassesH * 0.5,  // Centered perfectly on the eye line
            glassesW,
            glassesH
          );
          ctx.restore();
        }

        faceMesh.close();
        setStage('result');
      });

      await faceMesh.send({ image: snapCanvas });
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not detect a face. Please ensure your face is clearly visible and try again.');
      setStage('error');
    }
  }, [productImage]);

  const handleRetake = () => {
    setStage('preview');
    setCamerasLoading(true);
    setErrorMsg('');
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
    }).then(stream => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCamerasLoading(false);
      }
    }).catch(() => {
      setErrorMsg('Camera access denied.');
      setStage('error');
      setCamerasLoading(false);
    });
  };

  const handleClose = () => {
    stopCamera();
    if (faceMeshRef.current) {
      try { faceMeshRef.current.close(); } catch { }
      faceMeshRef.current = null;
    }
    setStage('preview');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            className="relative w-full max-w-xl bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">Virtual Try-On</p>
                <h2 className="text-white font-black text-base uppercase italic tracking-wide leading-tight">{productName}</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Camera / Result area */}
            <div className="relative bg-black" style={{ aspectRatio: '4/3' }}>

              {/* Live camera preview */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)', display: stage === 'preview' ? 'block' : 'none' }}
                playsInline
                muted
              />

              {/* Result canvas */}
              <canvas
                ref={resultCanvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: stage === 'result' ? 'block' : 'none' }}
              />

              {/* Camera loading overlay */}
              {stage === 'preview' && camerasLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 gap-3">
                  <Loader2 size={36} className="text-teal-400 animate-spin" />
                  <p className="text-white font-bold text-sm uppercase tracking-widest">Starting Camera...</p>
                </div>
              )}

              {/* Processing overlay */}
              {stage === 'processing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-teal-400/30 border-t-teal-400 animate-spin" />
                    <Camera size={20} className="text-teal-400 absolute inset-0 m-auto" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black text-sm uppercase tracking-widest mb-1">Analysing Face...</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Applying frame to your photo</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {stage === 'error' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 gap-4 px-8 text-center">
                  <AlertCircle size={40} className="text-red-400" />
                  <p className="text-white font-black text-sm uppercase tracking-widest">Error</p>
                  <p className="text-gray-400 text-xs font-medium max-w-xs">{errorMsg}</p>
                  <button onClick={handleRetake} className="mt-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-full text-white text-xs font-black uppercase tracking-widest transition-colors">
                    Try Again
                  </button>
                </div>
              )}

              {/* Live camera guide overlay */}
              {stage === 'preview' && !camerasLoading && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  {/* Face guide oval */}
                  <div className="w-40 h-52 border-2 border-dashed border-teal-400/60 rounded-[50%] mb-4" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-5 flex items-center justify-between gap-4 border-t border-white/10">
              {stage === 'preview' && (
                <>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold flex-1">
                    Centre your face in the oval, then capture
                  </p>
                  <button
                    onClick={handleCapture}
                    disabled={camerasLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-teal-600/30"
                  >
                    <Camera size={16} />
                    Capture & Try On
                  </button>
                </>
              )}

              {stage === 'result' && (
                <>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold flex-1">
                    How does it look? 👓
                  </p>
                  <button
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <RotateCcw size={14} />
                    Retake
                  </button>
                </>
              )}

              {stage === 'processing' && (
                <p className="text-center w-full text-gray-500 text-[10px] uppercase tracking-widest font-bold">Please wait...</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function loadGlassesImage(src: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);

      // Remove white background, lens reflections, and clear nose pads
      const id = ctx.getImageData(0, 0, c.width, c.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        // Calculate perceived brightness (luminance)
        const luminance = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        
        // Start fading out at medium-dark grey (80), fully transparent at light grey/white (180)
        // This removes the "glass" and the silicone nose pads while keeping dark frames sharp.
        if (luminance > 40) {
          let alphaFactor = 1 - ((luminance - 40) / 140);
          if (alphaFactor < 0) alphaFactor = 0; // Bright stuff becomes fully transparent
          if (alphaFactor > 1) alphaFactor = 1;
          
          d[i + 3] = d[i + 3] * alphaFactor;
        }
      }
      ctx.putImageData(id, 0, 0);
      resolve(c);
    };
    img.onerror = () => {
      // Fallback: return blank canvas
      const c = document.createElement('canvas');
      c.width = 100; c.height = 40;
      resolve(c);
    };
    img.src = src;
  });
}
