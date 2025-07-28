import { atom } from "recoil";

import { CharacterType } from "../helpers/helpers";

// Default state for character list
export const characterListState = atom<CharacterType[]>({
  key: "characterListState",
  default: [],
});
