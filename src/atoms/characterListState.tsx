import { atom } from "recoil";

// Default state for character list
export const characterListState = atom({
  key: "characterListState",
  default: [],
});
