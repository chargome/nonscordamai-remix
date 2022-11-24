import type { OutputData } from "@editorjs/editorjs";
import type {
  deleteEntry,
  getEntries,
  getEntry,
} from "~/lib/entry/entry.service";

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

export type EntryResponse = Awaited<ReturnType<typeof getEntry>>;
export type EntryResponseData = EntryResponse["data"];

export type DeleteEntryResponse = Awaited<ReturnType<typeof deleteEntry>>;
export type DeleteEntryResponseData = DeleteEntryResponse["data"];

export const FORM_DATA_LOCATION = "location";
export const FORM_DATA_DATA = "data";
