import create from "zustand";
import type { EntryLocation, EntryData } from "~/types/entry";

interface AddEntryState {
  location?: EntryLocation;
  data: EntryData;
  createdAt: Date;
  setLocation: (location?: EntryLocation) => void;
  setData: (data?: EntryData) => void;
  reset: () => void;
}

export const useAddEntryStore = create<AddEntryState>((set, get) => ({
  data: { blocks: [] },
  createdAt: new Date(),
  setLocation: (location) => {
    set({ location });
  },
  setData: (data) => {
    set({ data });
  },
  reset: () => {
    set({
      location: undefined,
      data: { blocks: [] },
    });
  },
}));
