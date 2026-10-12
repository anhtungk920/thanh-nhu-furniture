"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  note: string;
  paymentMethod: "cod" | "bank_transfer";
}

export default function ThanhToanPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutForm, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackToHome = () => {
    clearCart();
    setShowSuccessModal(false);
    router.push("/");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
    }

    const phoneDigits = form.phone.replace(/\s/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^0\d{9}$/.test(phoneDigits)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)";
    }

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.city) {
      newErrors.city = "Vui lòng chọn tỉnh/thành phố";
    }

    if (!form.district.trim()) {
      newErrors.district = "Vui lòng nhập quận/huyện";
    }

    if (!form.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ chi tiết";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "Địa chỉ chi tiết phải có ít nhất 5 ký tự";
    }

    setErrors(newErrors);

    const firstErrorField = (
      Object.keys(newErrors) as (keyof CheckoutForm)[]
    )[0];
    if (firstErrorField) {
      document
        .querySelector(`[name="${firstErrorField}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newOrderNumber =
      "MB-" +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 5).toUpperCase();
    setOrderNumber(newOrderNumber);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  // Khóa cuộn body khi modal thành công đang mở.
  useEffect(() => {
    document.body.style.overflow = showSuccessModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSuccessModal]);

  // Phí vận chuyển: miễn phí cho đơn từ 10.000.000đ trở lên.
  const subtotal = totalPrice();
  const shippingFee = subtotal >= 10000000 ? 0 : 500000;
  const finalTotal = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#faf9f7] px-6 py-16 text-center">
        <svg
          aria-hidden="true"
          width={80}
          height={80}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          className="mb-6 text-stone-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 7h12l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2"
          />
        </svg>
        <h1 className="font-cormorant text-3xl font-semibold text-stone-800">
          Giỏ hàng đang trống
        </h1>
        <p className="mt-3 max-w-md text-sm text-stone-400">
          Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm
          của chúng tôi.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded bg-[#b08d57] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9a7a4a]"
        >
          Về Trang Chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/"
          className="text-sm text-stone-500 transition-colors hover:text-[#b08d57]"
        >
          ← Quay lại giỏ hàng
        </Link>

        <h1 className="font-cormorant mt-6 text-4xl font-semibold text-stone-900">
          Thanh Toán
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Vui lòng điền thông tin giao hàng để hoàn tất đơn hàng
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-stone-100 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b08d57] text-sm font-semibold text-white">
                  1
                </span>
                <h2 className="font-cormorant text-2xl font-semibold text-stone-900">
                  Thông Tin Giao Hàng
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  />
                  {errors.fullName && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="0900 000 000"
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  />
                  {errors.phone && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  />
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Tỉnh/Thành phố
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.city
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  >
                    <option value="" disabled>
                      Chọn tỉnh/thành phố
                    </option>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Tỉnh khác">Tỉnh khác</option>
                  </select>
                  {errors.city && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.city}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Quận/Huyện
                  </label>
                  <input
                    name="district"
                    type="text"
                    value={form.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    placeholder="Quận 1"
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.district
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  />
                  {errors.district && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.district}
                    </motion.p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Địa chỉ chi tiết
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : "border-stone-200 focus:border-[#b08d57] focus:ring-[#b08d57]/20"
                    }`}
                  />
                  {errors.address && (
                    <motion.p
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.address}
                    </motion.p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-stone-700">
                    Ghi chú
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    value={form.note}
                    onChange={(e) => handleChange("note", e.target.value)}
                    placeholder="Ghi chú về đơn hàng (không bắt buộc)..."
                    className="w-full resize-none rounded-lg border border-stone-200 px-4 py-3 text-sm focus:border-[#b08d57] focus:outline-none focus:ring-2 focus:ring-[#b08d57]/20"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100 mt-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="w-7 h-7 bg-[#b08d57] text-white rounded-full flex items-center justify-center text-xs font-inter">
                  2
                </span>
                <h2 className="font-cormorant text-xl font-semibold text-stone-900">
                  Phương Thức Thanh Toán
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-200 ${
                      form.paymentMethod === "cod"
                        ? "border-[#b08d57] bg-[#b08d57]/5 ring-1 ring-[#b08d57]/20"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === "cod"}
                      onChange={(e) =>
                        handleChange("paymentMethod", e.target.value)
                      }
                      className="h-4 w-4 accent-[#b08d57]"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-stone-900">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <span className="mt-0.5 block text-xs text-stone-500">
                        Thanh toán bằng tiền mặt khi nhận được hàng
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-6 w-6 text-stone-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                  </label>
                </div>

                <div>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-200 ${
                      form.paymentMethod === "bank_transfer"
                        ? "border-[#b08d57] bg-[#b08d57]/5 ring-1 ring-[#b08d57]/20"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={form.paymentMethod === "bank_transfer"}
                      onChange={(e) =>
                        handleChange("paymentMethod", e.target.value)
                      }
                      className="h-4 w-4 accent-[#b08d57]"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-stone-900">
                        Chuyển khoản ngân hàng
                      </span>
                      <span className="mt-0.5 block text-xs text-stone-500">
                        Chuyển khoản trước, xác nhận đơn sau khi nhận tiền
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-6 w-6 text-stone-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                      />
                    </svg>
                  </label>

                  <AnimatePresence initial={false}>
                    {form.paymentMethod === "bank_transfer" && (
                      <motion.div
                        key="bank-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-3 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm">
                          <p className="mb-2 font-medium text-stone-900">
                            Thông tin chuyển khoản:
                          </p>
                          <ul className="space-y-1 text-stone-600">
                            <li>
                              <span className="text-stone-500">Ngân hàng:</span>{" "}
                              Vietcombank
                            </li>
                            <li>
                              <span className="text-stone-500">Số TK:</span>{" "}
                              1234 5678 9012
                            </li>
                            <li>
                              <span className="text-stone-500">Chủ TK:</span>{" "}
                              CÔNG TY TNHH THANH NHU
                            </li>
                            <li>
                              <span className="text-stone-500">Nội dung CK:</span>{" "}
                              THANHNHU {form.phone || "[Số điện thoại]"}
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100">
                <h2 className="font-cormorant text-xl font-semibold text-stone-900 mb-6">
                  Đơn Hàng Của Bạn
                </h2>

                {/* Danh sách sản phẩm trong giỏ. */}
                <ul className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <div className="absolute inset-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <span className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-900 truncate">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-stone-400">
                          SL: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-stone-900 whitespace-nowrap">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Ô mã giảm giá: cosmetic, chưa có logic áp dụng. */}
                <div className="mt-6 flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá"
                    className="flex-1 w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/20"
                  />
                  <button
                    type="button"
                    className="px-4 py-2.5 border border-stone-900 rounded-lg text-sm text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Chi tiết tiền: tạm tính, phí vận chuyển. */}
                <div className="mt-6 border-t border-stone-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Tạm tính</span>
                    <span className="text-stone-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Phí vận chuyển</span>
                    <span className="text-stone-900">
                      {shippingFee === 0 ? (
                        <span className="text-green-600 font-medium">Miễn phí</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  {/* Gợi ý mua thêm để được miễn phí vận chuyển. */}
                  {subtotal < 10000000 && (
                    <p className="text-xs text-[#b08d57]">
                      Mua thêm {formatPrice(10000000 - subtotal)} để được miễn phí
                      vận chuyển
                    </p>
                  )}
                </div>

                {/* Tổng cộng. */}
                <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between items-center">
                  <span className="text-base font-medium text-stone-900">
                    Tổng cộng
                  </span>
                  <span className="font-cormorant text-2xl font-bold text-stone-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full mt-6 py-4 bg-[#b08d57] text-white text-sm font-medium uppercase tracking-wider rounded-lg hover:bg-[#c9a66b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    "Đặt Hàng"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal cảm ơn: bắt buộc bấm 'Về Trang Chủ' để đóng (không đóng bằng overlay/Escape). */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Đặt hàng thành công"
                className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl lg:p-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Checkmark vẽ tay bằng motion.path (pathLength 0 -> 1). */}
                <motion.div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.svg
                    className="w-10 h-10 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                </motion.div>

                <h2 className="font-cormorant text-3xl font-bold text-stone-900">
                  Đặt Hàng Thành Công!
                </h2>
                <p className="mt-3 text-sm text-stone-500">
                  Cảm ơn bạn đã tin tưởng Thanh Nhu. Chúng tôi sẽ liên hệ xác
                  nhận đơn hàng trong vòng 30 phút.
                </p>

                <div className="mt-6 inline-block rounded-lg bg-stone-50 px-4 py-3">
                  <span className="text-xs text-stone-500">Mã đơn hàng</span>
                  <p className="font-mono text-lg font-bold text-stone-900">
                    {orderNumber}
                  </p>
                </div>

                <p className="mt-4 text-xs text-stone-400">
                  Mọi thắc mắc vui lòng liên hệ hotline: (+84) 90 123 4567
                </p>

                <button
                  type="button"
                  onClick={handleBackToHome}
                  className="mt-6 w-full rounded-lg bg-[#b08d57] py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#c9a66b]"
                >
                  Về Trang Chủ
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
