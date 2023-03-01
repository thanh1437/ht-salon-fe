import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CustomCarousel({
  autoPlay = true,
  children,
  responsive,
  customLeftArrow = null,
  customRightArrow = null,
}) {
  return (
    <Carousel
      //   customLeftArrow={customLeftArrow}
      //   customRightArrow={customRightArrow}
      responsive={responsive}
      //   animation="slide"
      //   autoPlay={autoPlay}
      //   containerClass="row"
    >
      {children}
    </Carousel>
  );
}
