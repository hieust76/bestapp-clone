import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely with clsx and twMerge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number into Vietnamese Dong currency string (e.g. 150.000đ).
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("₫", "đ");
}

/**
 * Calculates discount percentage between original price and sale price.
 */
export function calculateDiscountPercent(original: number, sale: number): number {
  if (original <= 0 || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Generates a unique order code, e.g. BA2408-9842
 */
export function generateOrderCode(prefix = "BA"): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${random}`;
}
