import type { OutputData } from "@editorjs/editorjs";

export interface EntryLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface Entry {
  location: EntryLocation;
  data: OutputData;
}

export const FORM_DATA_LOCATION = "location";
export const FORM_DATA_DATA = "data";
