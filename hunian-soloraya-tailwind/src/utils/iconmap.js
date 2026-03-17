/**
 * Icon map - menggunakan string key agar aman dari masalah encoding.
 * Emoji di-render di sini, bukan di data/index.js.
 */
export const ICON_MAP = {
  // Unit types
  "1-lantai": String.fromCodePoint(0x1f3e0), // 🏠
  mezanin: String.fromCodePoint(0x1f3e1), // 🏡
  "2-lantai": String.fromCodePoint(0x1f3e2), // 🏢

  // Location points
  sekolah: String.fromCodePoint(0x1f3eb), // 🏫
  rumahsakit: String.fromCodePoint(0x1f3e5), // 🏥
  belanja: String.fromCodePoint(0x1f6d2), // 🛒
  tol: String.fromCodePoint(0x1f6e3), // 🛣️
  taman: String.fromCodePoint(0x1f33f), // 🌿

  // Contact info
  telp: String.fromCodePoint(0x1f4de), // 📞
  wa: String.fromCodePoint(0x1f4ac), // 💬
  email: String.fromCodePoint(0x1f4e7), // 📧
  jam: String.fromCodePoint(0x1f550), // 🕐

  // Unit specs
  bed: String.fromCodePoint(0x1f6cf), // 🛏
  bath: String.fromCodePoint(0x1f6bf), // 🚿
  size: String.fromCodePoint(0x1f4d0), // 📐
  pin: String.fromCodePoint(0x1f4cd), // 📍
};

/**
 * Helper: ambil emoji dari key
 * @param {string} key
 * @returns {string} emoji atau key itu sendiri jika tidak ditemukan
 */
export const getIcon = (key) => ICON_MAP[key] || key;
