import { atom } from "recoil";

// Default state for character list
export const charactersState = atom<Array<object>>({
  key: "charactersState",
  default: [],
});
