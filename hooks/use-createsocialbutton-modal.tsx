import { create } from "zustand";

interface CreateSocialButtonModalState {
  username: string;
  isOpen: boolean;
  onOpen: (username: string) => void;
  onClose: () => void;
}

export const useCreateSocialButtonModal = create<CreateSocialButtonModalState>(
  (set) => ({
    username: "",
    isOpen: false,
    onOpen: (username) => set(() => ({ isOpen: true, username })),
    onClose: () => set(() => ({ isOpen: false, username: "" })),
  })
);
