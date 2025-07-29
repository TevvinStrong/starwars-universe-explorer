import { atom } from "recoil";

import { RelatedDataType } from "../helpers/helpers";

export const relatedDataState = atom<RelatedDataType | null>({
  key: "relatedDataState",
  default: null,
});

export const relatedDataLoadingState = atom<boolean>({
  key: "relatedDataLoadingState",
  default: false,
});
