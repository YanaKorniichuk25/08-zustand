import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "notehub-draft" }
  )
);
