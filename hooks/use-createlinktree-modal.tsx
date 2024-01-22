import { create } from "zustand";

interface CreateLinktreeModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateLinktreeModal = create<CreateLinktreeModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set(() => ({ isOpen: true })),
    onClose: () => set(() => ({ isOpen: false })),
  })
);
