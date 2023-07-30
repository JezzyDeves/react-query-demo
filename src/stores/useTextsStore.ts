import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TextsStore {
  texts: string[];
  addText: (text: string) => void;
}

export const useTextStore = create<TextsStore>()(
  immer((set) => ({
    texts: [],
    addText: (text: string) =>
      set((state) => {
        state.texts = [...state.texts, text];
      }),
  }))
);
