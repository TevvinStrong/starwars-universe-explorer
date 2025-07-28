import { atom } from "recoil";

export const characterCardLoadingState = atom<boolean>({
  key: "characterCardLoadingState",
  default: false,
});
