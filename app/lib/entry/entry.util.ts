import type { EntriesResponseData, Entry } from "~/types/entry";

export const parseEntryResponse = (response: EntriesResponseData): Entry[] =>
  response?.map(({ id, lat, lng, address, created_at, data }) => ({
    id,
    createdAt: new Date(created_at),
    location: {
      lat,
      lng,
      address,
    },
    data,
  })) || [];
