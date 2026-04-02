export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  image: string;
  stock: boolean;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export const CONTACT_PHONE = "919989362643";
export const WHATSAPP_LINK = `https://wa.me/${CONTACT_PHONE}`;

export const categories: Category[] = [
  { id: 'c1', name: 'Frames' },
  { id: 'c2', name: 'Sunglasses' },
  { id: 'c3', name: 'Prescription Glasses' },
  { id: 'c4', name: 'Cooling Goggles' },
];

// Placeholder images via Unsplash
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Summer Cooling Goggles',
    price: 250.00,
    categoryId: 'c4',
    description: 'Perfect for the sunny weather in Vijayawada. Lightweight and UV protected.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    stock: true,
  },
  {
    id: 'p2',
    name: 'General Frames - Classic',
    price: 150.00,
    categoryId: 'c1',
    description: 'Durable, everyday wear classic frames suitable for any prescription.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800',
    stock: true,
  },
  {
    id: 'p3',
    name: 'Wayfarer Sunglasses',
    price: 350.00,
    categoryId: 'c2',
    description: 'Trendy wayfarer style sunglasses with polarized lenses.',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
    stock: true,
  },
  {
    id: 'p4',
    name: 'Premium Rimless Glasses',
    price: 450.00,
    categoryId: 'c3',
    description: 'Elegant, lightweight rimless glasses for a subtle look.',
    image: 'https://images.unsplash.com/photo-1483412033650-1015dce15918?auto=format&fit=crop&q=80&w=800',
    stock: true,
  },
  {
    id: 'p5',
    name: 'Aviator Cooling Goggles',
    price: 250.00,
    categoryId: 'c4',
    description: 'Classic aviator style summer glass for ultimate protection.',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814050b4?auto=format&fit=crop&q=80&w=800',
    stock: true,
  },
  {
    id: 'p6',
    name: 'Kids Flexible Frames',
    price: 200.00,
    categoryId: 'c1',
    description: 'Unbreakable, colorful frames designed specifically for children.',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800',
    stock: true,
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ravi Kumar',
    rating: 4.0,
    comment: 'Good collections of frames and cooling glasses. Bought summer goggles for ₹250. Excellent service by the shop owner.',
    date: '2 weeks ago'
  },
  {
    id: 'r2',
    name: 'Suresh V',
    rating: 5.0,
    comment: 'Very professional eye testing and affordable frames. Got my prescription glasses delivered the next day.',
    date: '1 month ago'
  },
  {
    id: 'r3',
    name: 'Priya Reddy',
    rating: 4.5,
    comment: 'Best optical shop in Chowk area, Vijayawada. I fixed my broken frame here, very quick and cheap.',
    date: '3 months ago'
  }
];
