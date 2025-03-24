export interface Data {
  rows: string[];
  page: string;
  links: string[];
  search: string;
  sort: string;
  direction: string;
}

export interface TableGrid {
  getSearch: (e: Event) => void;
  setSearch: (e: Event) => void;
  setSort: (s: string) => void;
  setLoad: (newParams: object) => void;
}

export type Params = string | string[][] | Record<string, string> | URLSearchParams

export type SetTimeout = ReturnType<typeof setTimeout> // NodeJS.Timeout
