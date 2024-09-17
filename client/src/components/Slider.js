import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false, // dấu ... dưới ảnh
  infinite: true, //click đc hết
  speed: 500, //tốc độ
  slidesToShow: 1,
  slidesToScroll: 1,
};
const SliderCustom = ({ images }) => {
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-black flex justify-center h-[320px] px-12"
              >
                <img
                  src={item}
                  alt="slider-image"
                  className="object-contain  m-auto h-full"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);
