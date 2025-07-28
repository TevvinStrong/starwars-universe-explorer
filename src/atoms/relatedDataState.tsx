import { atom } from "recoil";

import { RelatedData } from "../helpers/helpers";

export const relatedDataState = atom<RelatedData | null>({
  key: "relatedDataState",
  default: null,
});

export const relatedDataLoadingState = atom<boolean>({
  key: "relatedDataLoadingState",
  default: false,
});
