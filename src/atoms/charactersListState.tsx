import { atom } from "recoil";

// Default state for character list
export const charactersListState = atom({
  key: "charactersListState",
  default: [],
});
