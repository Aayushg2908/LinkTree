import { create } from "zustand";

interface CreateLinktreeModalState {
  username: string;
  isOpen: boolean;
  onOpen: (username?: string) => void;
  onClose: () => void;
}

export const useCreateLinktreeModal = create<CreateLinktreeModalState>(
  (set) => ({
    username: "",
    isOpen: false,
    onOpen: (username) => set(() => ({ isOpen: true, username })),
    onClose: () => set(() => ({ isOpen: false, username: "" })),
  })
);
