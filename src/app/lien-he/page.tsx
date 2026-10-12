"use client";

import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const subjects = [
  "Tư vấn thiết kế",
  "Tư vấn sản phẩm",
  "Hợp tác",
  "Bảo hành",
  "Khác",
];

const inputClass =
  "w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#b08d57] focus:outline-none";

export default function LienHePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main className="bg-[#faf9f7]">
        {/* Hero */}
        <section className="border-b border-stone-100 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-stone-400" aria-label="Đường dẫn trang">
              <Link href="/" className="transition-colors hover:text-[#b08d57]">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-stone-900">Liên hệ</span>
            </nav>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
              LIÊN HỆ
            </p>
            <h1 className={`${cormorant.className} mb-3 text-4xl font-semibold text-stone-900 lg:text-5xl`}>
              Kết Nối Với Thanh Nhu
            </h1>
            <div className="mb-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <p className="max-w-2xl leading-relaxed text-stone-500">
              Để lại lời nhắn, gọi hotline hoặc ghé showroom — đội ngũ Thanh Nhu luôn
              sẵn sàng lắng nghe và tư vấn giải pháp nội thất phù hợp nhất cho bạn.
            </p>
          </div>
        </section>

        {/* Main */}
        <section className="bg-[#faf9f7] py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <h2 className={`${cormorant.className} text-2xl font-semibold text-stone-900`}>
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>
              {submitted ? (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="lien-he-name" className="mb-1 block text-sm font-medium text-stone-700">
                      Họ tên
                    </label>
                    <input
                      id="lien-he-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lien-he-email" className="mb-1 block text-sm font-medium text-stone-700">
                      Email
                    </label>
                    <input
                      id="lien-he-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ban@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lien-he-phone" className="mb-1 block text-sm font-medium text-stone-700">
                      SĐT
                    </label>
                    <input
                      id="lien-he-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="090 123 4567"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lien-he-subject" className="mb-1 block text-sm font-medium text-stone-700">
                      Chủ đề
                    </label>
                    <select
                      id="lien-he-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lien-he-message" className="mb-1 block text-sm font-medium text-stone-700">
                      Nội dung
                    </label>
                    <textarea
                      id="lien-he-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Bạn cần tư vấn điều gì?"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#b08d57] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#c9a66b]"
                  >
                    Gửi Tin Nhắn
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#b08d57]/10 text-[#b08d57]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-stone-400">
                      Địa chỉ
                    </span>
                    <span className="mt-1 block text-sm font-medium text-stone-900">
                      123 Nguyễn Huệ, Quận 1, TP. HCM
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#b08d57]/10 text-[#b08d57]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 3h3.2l1.6 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.6V17a4 4 0 0 1-4.4 4A16 16 0 0 1 3 7.4 4 4 0 0 1 5 3z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-stone-400">
                      Hotline
                    </span>
                    <a href="tel:+84901234567" className="mt-1 block text-sm font-medium text-stone-900 transition-colors hover:text-[#b08d57]">
                      (+84) 90 123 4567
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#b08d57]/10 text-[#b08d57]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3.5 6.5 8.5 6 8.5-6" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-stone-400">
                      Email
                    </span>
                    <a href="mailto:info@thanhnhu.vn" className="mt-1 block text-sm font-medium text-stone-900 transition-colors hover:text-[#b08d57]">
                      info@thanhnhu.vn
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#b08d57]/10 text-[#b08d57]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-stone-400">
                      Giờ làm việc
                    </span>
                    <span className="mt-1 block text-sm font-medium text-stone-900">
                      T2 - T7: 8:00 - 20:00
                    </span>
                  </span>
                </div>
              </div>
              <iframe
                title="Bản đồ showroom Thanh Nhu"
                src="https://maps.google.com/maps?q=123%20Nguy%E1%BB%85n%20Hu%E1%BB%87%2C%20Qu%E1%BA%ADn%201%2C%20TP.%20HCM&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-6 rounded-2xl"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}