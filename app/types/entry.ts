import type { OutputData } from "@editorjs/editorjs";
import type { Location } from "./location";

export interface Entry {
  location: Location;
  data: OutputData;
}

export const FORM_DATA_LOCATION = "location";
export const FORM_DATA_DATA = "data";
