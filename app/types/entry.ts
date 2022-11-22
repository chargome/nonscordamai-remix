import type { OutputData } from "@editorjs/editorjs";
import type { getEntries } from "~/lib/entry/entry.service";

export interface EntryLocation {
  address: string;
  lat: number;
  lng: number;
}

export type EntryData = OutputData;

export interface Entry {
  id: string;
  createdAt: Date;
  location: EntryLocation;
  data: EntryData;
}

export type EntriesResponse = Awaited<ReturnType<typeof getEntries>>;
export type EntriesResponseData = EntriesResponse["data"];

export const FORM_DATA_LOCATION = "location";
export const FORM_DATA_DATA = "data";
