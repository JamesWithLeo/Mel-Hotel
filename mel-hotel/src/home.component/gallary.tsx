// images
import hotelAtBeack from "../assets/images/hotel-at-beachside.jpg";
import hotelroom from "../assets/images/hotel-room.jpg";
import hotelhallway from "../assets/images/hotel-hallway.jpg";
import hotelbreakfast from "../assets/images/hotel-breakfast.jpg";
// carousel library  slick-carousel / react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Gallary() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div id="gallary" className="flex h-max w-full">
      <Slider {...settings} className="flex w-full gap-0 overflow-hidden">
        <div>
          <img
            src={hotelAtBeack}
            alt="hotel beach side"
            className="h-auto w-96"
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
            className="h-auto w-96"
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
            className="h-auto w-96"
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
            className="h-auto w-96"
          />
        </div>
      </Slider>
    </div>
  );
}
