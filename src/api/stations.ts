export type Station = {
  id: `station_${number}`;
  name: string;
};

export function getStationURL(id: string): string {
  return `${getStationsURL()}/${id}`;
}

export function getStationsURL(): string {
  return "stations";
}
