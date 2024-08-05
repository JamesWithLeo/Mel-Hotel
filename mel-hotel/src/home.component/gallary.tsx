// images
import hotelAtBeack from "../assets/images/hotel-at-beachside.jpg";
import hotelroom from "../assets/images/hotel-room.jpg";
import hotelhallway from "../assets/images/hotel-hallway.jpg";
import hotelbreakfast from "../assets/images/hotel-breakfast.jpg";
// carousel library  slick-carousel / react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export type carouselTypeface = {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  swipeToSlide?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  centerMode?: boolean;
  initialSlide?: number;
  adaptiveHeight?: boolean;
  vertical?: boolean;
  responsive?: [
    { breakpoint: number; settings: carouselTypeface },
    { breakpoint: number; settings: carouselTypeface },
    { breakpoint: number; settings: carouselTypeface },
  ];
};
export default function Gallary({
  settings,
  isFullscreen,
}: {
  settings: carouselTypeface;
  isFullscreen?: true;
}) {
  const imagesStyle = isFullscreen
    ? "h-dvh bg-center bg-repeat w-full "
    : "h-auto w-full";
  const parentStyle = isFullscreen
    ? "flex h-full w-full absolute z-0 overflow-y-hidden brightness-75 contrast-100 items-center saturate-100  "
    : "flex h-max w-full";
  return (
    <div id="gallary" className={parentStyle}>
      <Slider {...settings} className="flex w-full gap-0 overflow-hidden">
        <div>
          <img
            src={hotelAtBeack}
            alt="hotel beach side"
            className={imagesStyle}
          />
        </div>
        <div>
          <span className="absolute w-max text-xs text-gray-800">
            Image by{" "}
            <a href="https://pixabay.com/users/engin_akyurt-3656355/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4394771">
              Engin Akyurt
            </a>{" "}
            from{" "}
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4394771">
              Pixabay
            </a>
          </span>
          <img
            src={hotelbreakfast}
            alt="Hotel Healthy breakfast"
            className={imagesStyle}
          />
        </div>

        <div className="">
          <span className="absolute w-max text-xs text-gray-400">
            Image by{" "}
            <a href="https://pixabay.com/users/cyprusvillas-3510913/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1737168">
              Sevinos Erotokritou
            </a>{" "}
            from{" "}
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1737168">
              Pixabay
            </a>
          </span>
          <img
            src={hotelroom}
            alt="hotel room interior"
            className={imagesStyle}
          />
        </div>
        <div className="">
          <span className="absolute w-max text-xs text-gray-400">
            Image by{" "}
            <a href="https://pixabay.com/users/jsell-9751446/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3588214">
              Jill Sellers
            </a>{" "}
            from{" "}
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3588214">
              Pixabay
            </a>
          </span>
          <img
            src={hotelhallway}
            alt="hotel beach side"
            className={imagesStyle}
          />
        </div>
      </Slider>
    </div>
  );
}
