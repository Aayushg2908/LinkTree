import { create } from "zustand";

interface CreateLinkModalState {
  username: string;
  isOpen: boolean;
  onOpen: (username: string) => void;
  onClose: () => void;
}

export const useCreateLinkModal = create<CreateLinkModalState>((set) => ({
  username: "",
  isOpen: false,
  onOpen: (username) => set(() => ({ isOpen: true, username })),
  onClose: () => set(() => ({ isOpen: false, username: "" })),
}));
