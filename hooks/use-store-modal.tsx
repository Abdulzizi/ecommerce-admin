import { create } from "zustand";

// Definisikan bentuk dari store modal
interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Hook untuk mengelola state modal.
 * Menggunakan Zustand untuk membuat store modal dengan state isOpen, onOpen, dan onClose.
 * @returns {Object} Objek store modal dengan state dan fungsi untuk mengontrol modal.
 */

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }), // Fungsi untuk membuka modal
  onClose: () => set({ isOpen: false }) // Fungsi untuk menutup modal
}));