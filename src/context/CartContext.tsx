"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, MenuItem, OrderDetails, ReservationDetails } from "@/types";

interface CartContextType {
  cart: CartItem[]; isCartOpen: boolean; setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeFromCart: (itemId: string) => void; updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void; cartCount: number; subtotal: number; deliveryFee: number; serviceTax: number; total: number;
  orders: OrderDetails[]; createOrder: (data: Omit<OrderDetails, "id" | "orderNumber" | "createdAt" | "status">) => OrderDetails;
  reservations: ReservationDetails[]; createReservation: (data: Omit<ReservationDetails, "id" | "createdAt" | "status">) => ReservationDetails; mounted: boolean;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
const keys = { cart: "gt-cart-items", orders: "gt-orders", reservations: "gt-reservations", last: "gt-last-order" };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]); const [orders, setOrders] = useState<OrderDetails[]>([]); const [reservations, setReservations] = useState<ReservationDetails[]>([]); const [isCartOpen, setIsCartOpen] = useState(false); const [mounted, setMounted] = useState(false);
  useEffect(() => { try { setCart(JSON.parse(localStorage.getItem(keys.cart) || "[]")); setOrders(JSON.parse(localStorage.getItem(keys.orders) || "[]")); setReservations(JSON.parse(localStorage.getItem(keys.reservations) || "[]")); } catch { /* ignore invalid persisted state */ } setMounted(true); }, []);
  useEffect(() => { if (mounted) localStorage.setItem(keys.cart, JSON.stringify(cart)); }, [cart, mounted]);
  const addToCart = (item: MenuItem, quantity = 1, instructions?: string) => { setCart(previous => { const found = previous.find(x => x.item.id === item.id); return found ? previous.map(x => x.item.id === item.id ? { ...x, quantity: x.quantity + quantity, specialInstructions: instructions || x.specialInstructions } : x) : [...previous, { item, quantity, specialInstructions: instructions }]; }); setIsCartOpen(true); };
  const removeFromCart = (id: string) => setCart(previous => previous.filter(x => x.item.id !== id));
  const updateQuantity = (id: string, delta: number) => setCart(previous => previous.map(x => x.item.id === id ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0));
  const clearCart = () => setCart([]); const cartCount = cart.reduce((sum, x) => sum + x.quantity, 0); const subtotal = cart.reduce((sum, x) => sum + x.item.price * x.quantity, 0); const deliveryFee = subtotal > 0 ? 5 : 0; const serviceTax = Number((subtotal * 0.125).toFixed(2)); const total = Number((subtotal + deliveryFee + serviceTax).toFixed(2));
  const createOrder = (data: Omit<OrderDetails, "id" | "orderNumber" | "createdAt" | "status">): OrderDetails => { const order: OrderDetails = { ...data, id: `ord-${Date.now()}`, orderNumber: `GT-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date().toISOString(), status: "Received" }; const next = [order, ...orders]; setOrders(next); localStorage.setItem(keys.orders, JSON.stringify(next)); localStorage.setItem(keys.last, JSON.stringify(order)); clearCart(); return order; };
  const createReservation = (data: Omit<ReservationDetails, "id" | "createdAt" | "status">): ReservationDetails => { const reservation: ReservationDetails = { ...data, id: `res-${Date.now()}`, createdAt: new Date().toISOString(), status: "Confirmed" }; const next = [reservation, ...reservations]; setReservations(next); localStorage.setItem(keys.reservations, JSON.stringify(next)); return reservation; };
  return <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, deliveryFee, serviceTax, total, orders, createOrder, reservations, createReservation, mounted }}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used within CartProvider"); return context; }
