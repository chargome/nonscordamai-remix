import create from "zustand";
import type { OutputData } from "@editorjs/editorjs";
import type { Location } from "~/types/location";

interface AddEntryState {
  location?: Location;
  data: OutputData;
  createdAt: Date;
  setLocation: (location?: Location) => void;
  setData: (data?: OutputData) => void;
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
