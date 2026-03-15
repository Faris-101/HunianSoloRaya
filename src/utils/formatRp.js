/**
 * Format angka ke format Rupiah Indonesia
 * @param {number} n - Angka yang ingin diformat
 * @returns {string} - Contoh: "Rp 800.000.000"
 */
export const formatRp = (n) => {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
};
