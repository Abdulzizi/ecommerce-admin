import { useEffect, useState } from "react";

/**
 * Hook untuk mendapatkan origin URL dari window.location.
 * Berguna dalam pengaturan awal yang memerlukan origin URL.
 * Mengembalikan origin URL jika sudah dimuat, atau string kosong jika belum.
 * @returns {string} Origin URL.
 */
export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  
  // Dapatkan origin URL dari window.location jika tersedia
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  
  // Set state mounted menjadi true setelah komponen dimuat
  useEffect(() => {
    setMounted(true)
  }, [])

  // Jika komponen belum dimuat, kembalikan string kosong
  if (!mounted) {
    return ''
  }

  // return origin URL
  return origin;
};