"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const distance = (touches: TouchEvent<HTMLDivElement>["touches"]) =>
  Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (images.length < 2) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length);
        setScale(1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, images.length, onClose]);

  const changeImage = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    setScale(1);
    pinchRef.current = null;
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchRef.current = { distance: distance(event.touches), scale };
    }
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchRef.current) {
      setScale(Math.min(4, Math.max(1, pinchRef.current.scale * distance(event.touches) / pinchRef.current.distance)));
    }
  };

  const lightbox = (
    <AnimatePresence>
      {isOpen && images.length > 0 && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh sản phẩm"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Đóng ảnh"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-8 sm:top-8"
          >
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5 19 19M19 5 5 19" /></svg>
          </button>

          <div
            className="flex h-[85vh] w-[90vw] items-center justify-center overflow-hidden touch-none"
            onDoubleClick={() => setScale((current) => current > 1 ? 1 : 2)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => { pinchRef.current = null; }}
            onTouchCancel={() => { pinchRef.current = null; }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="relative h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 260, damping: 30 } }}
              >
                <Image src={images[index]} alt={`Ảnh sản phẩm ${index + 1}`} fill sizes="90vw" className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <button type="button" onClick={() => changeImage(index - 1)} aria-label="Ảnh trước" className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-8">
                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 5-7 7 7 7" /></svg>
              </button>
              <button type="button" onClick={() => changeImage(index + 1)} aria-label="Ảnh tiếp theo" className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-8">
                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 5 7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-5 z-10 flex items-center gap-2 sm:bottom-8" aria-label={`Ảnh ${index + 1} trên ${images.length}`}>
                {images.map((image, dot) => (
                  <button key={`${image}-${dot}`} type="button" onClick={() => changeImage(dot)} aria-label={`Xem ảnh ${dot + 1}`} aria-current={index === dot ? "true" : undefined} className={`h-2.5 w-2.5 rounded-full transition-all ${index === dot ? "bg-[#b08d57] scale-125" : "bg-white/50 hover:bg-white"}`} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document === "undefined" ? null : createPortal(lightbox, document.body);
}