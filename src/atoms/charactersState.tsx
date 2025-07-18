import { atom } from "recoil";

// Defaut state for character list
export const charactersState = atom<Array<object>>({
  key: "charactersState",
  default: [],
});
