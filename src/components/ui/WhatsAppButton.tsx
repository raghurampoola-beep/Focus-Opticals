"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/store";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  label?: string;
  disabled?: boolean;
}

export function WhatsAppButton({ 
  message = "Hi, I contact you from your website.", 
  className = "",
  variant = "primary",
  fullWidth = false,
  label = "Chat on WhatsApp",
  disabled = false
}: WhatsAppButtonProps) {
  
  const encodedMessage = encodeURIComponent(message);
  const href = disabled ? "#" : `${WHATSAPP_LINK}?text=${encodedMessage}`;

  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none rounded-xl px-5 py-2.5 text-sm";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const variantStyles = variant === "outline"
    ? "bg-[#25D366] text-white hover:bg-[#1DA851] shadow-sm"
    : "bg-[#25D366] text-white hover:bg-[#1DA851] shadow-sm";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";

  return (
    <motion.a 
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      href={href} 
      onClick={(e) => disabled && e.preventDefault()}
      target={disabled ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`${baseStyles} ${widthStyles} ${variantStyles} ${disabledStyles} ${className}`}
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      {label}
    </motion.a>
  );
}

