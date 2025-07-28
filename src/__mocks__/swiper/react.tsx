import { ReactNode } from "react";

export const Swiper = ({ children }: { children: ReactNode }) => (
  <div data-testid="swiper">{children}</div>
);

export const SwiperSlide = ({ children }: { children: ReactNode }) => (
  <div data-testid="swiperslide">{children}</div>
);
