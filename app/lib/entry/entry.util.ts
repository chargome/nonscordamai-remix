import type {
  EntriesResponseData,
  Entry,
  EntryResponseData,
} from "~/types/entry";

export const parseEntryResponse = (response: EntryResponseData): Entry => {
  if (!response) {
    throw new Error("missing response object");
  }
  const { id, created_at, lat, lng, address, data } = response;
  return {
    id,
    createdAt: new Date(created_at),
    location: {
      lat,
      lng,
      address,
    },
    data,
  };
};

export const parseEntriesResponse = (response: EntriesResponseData): Entry[] =>
  response?.map((entry) => parseEntryResponse(entry)) || [];
