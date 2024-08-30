import hotelCozyroom from "../assets/images/hotelRoom-sm.jpg";
import hotelFacade from "../assets/images/hotel-scenries1.jpg";
import hotelPool1 from "../assets/images/luxury-pool.jpg";
import hotelSalmon from "../assets/images/hotel-salmon.jpg";
import hotelReceptionist from "../assets/images/hotel-receptionists.jpg";
import { Link } from "react-router-dom";
import Gallary, { carouselTypeface } from "./gallary";
import Footer from "../footer.component/footer";
import { AppState, hotelStore } from "../hotelStore";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IBookSlice } from "../redux slices/bookSlice";
import { useQuery } from "@tanstack/react-query";
const settings: carouselTypeface = {
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
export default function Home() {
  const user = useSelector((state: AppState) => state.auth.user);
  const [activeBooking, setActiveBooking] = useState<IBookSlice[] | null>(null);

  return (
    <div
      className="flex h-full w-full max-w-7xl flex-col items-center bg-gray-100"
      id="homeContainer"
    >
      <Gallary settings={settings} />

      <div className="mb-4 w-full py-4 text-center shadow">
        <h1 className="font-cinzel text-5xl font-medium text-[#4F4A45]">
          Mel Hotel
        </h1>
        <h1 className="font-edu text-xs text-neutral-500">
          Affordable Elegance, Unforgettable Escapes
        </h1>
      </div>
      <div className="flex flex-row gap-4">
        <Link
          to={"/book/package/" + hotelStore.getState().booking.hotelPackage}
          className="bg-contrast font-fauna active:text-primarydark mb-4 rounded-full px-5 py-1 shadow drop-shadow duration-200 ease-in-out hover:scale-x-[1.05] active:shadow-[inset_0px_2px_5px_5px_#0000004d]"
        >
          Book Now!
        </Link>
        {user ? (
          <Link
            to={"package"}
            className="bg-contrast font-fauna active:text-primarydark mb-4 rounded-full px-5 py-1 shadow drop-shadow duration-200 ease-in-out hover:scale-x-[1.05] active:shadow-[inset_0px_2px_5px_5px_#0000004d]"
          >
            View schedule
          </Link>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-8 bg-gray-100 px-8 py-4 sm:flex-col">
        <section className="flex w-full flex-col items-center gap-4 md:flex-row">
          <div className="grid h-40 w-full max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:max-w-sm md:h-60">
            <div className="z-10 col-span-3 row-span-1 row-start-3 flex items-center bg-gradient-to-t from-gray-600 px-4 text-gray-100 lg:hidden lg:justify-center">
              <h1 className="font-bebas text-2xl opacity-70 sm:text-3xl lg:text-5xl">
                Wonderful sceneries
              </h1>
            </div>

            <img
              src={hotelFacade}
              alt="hotel scenery"
              className="col-span-3 col-start-1 col-end-4 row-start-1 columns-1"
            />
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h1 className="font-bebas text-primarydark hidden text-2xl opacity-70 lg:block lg:text-5xl">
              Wonderful Sceneries
            </h1>
            <h1 className="text-primarydark text-justify indent-8 font-sans text-sm drop-shadow">
              Our hotel boasts some of the most breathtaking sceneries that
              leave our guests in awe. Nestled amidst lush greenery, the
              panoramic views from every window showcase a vibrant tapestry of
              nature. From the serene sunrise painting the sky with hues of gold
              and pink to the majestic mountains standing tall in the distance,
              each vista offers a moment of tranquility and inspiration.
            </h1>
          </div>
        </section>
        <section className="flex w-full flex-col items-center gap-4 md:flex-row-reverse">
          <div
            id="homeAmmenities"
            className="grid h-40 w-full max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:max-w-sm md:h-60"
          >
            <div className="z-10 col-span-3 row-span-1 row-start-3 flex items-center bg-gradient-to-t from-gray-600 px-4 text-gray-100 lg:hidden lg:justify-center">
              <h1 className="font-bebas text-2xl opacity-70 sm:text-3xl lg:text-5xl">
                Cozy Rooms
              </h1>
            </div>
            <img
              src={hotelCozyroom}
              alt="cozy room"
              className="col-span-3 col-start-1 col-end-4 row-start-1 columns-1"
            />
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h1 className="font-bebas text-primarydark hidden self-end text-2xl opacity-70 lg:block lg:text-5xl">
              Coxy Rooms
            </h1>
            <h1 className="text-primarydark text-justify indent-8 font-sans text-sm drop-shadow">
              luxurious rooms and accommodations designed for comfort and
              convenience, featuring modern amenities and stylish decor. Guests
              can enjoy stunning views, private balconie, and plush beds. Family
              suites and interconnected rooms cater to larger groups, while
              executive rooms provide ergonomic workstations for business
              travelers.
            </h1>
          </div>
        </section>
        <section className="flex w-full flex-col items-center gap-4 md:flex-row">
          <div className="grid h-40 w-full max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:max-w-sm md:h-60">
            <div className="z-10 col-span-3 row-span-1 row-start-3 flex items-center bg-gradient-to-t from-gray-600 px-4 text-gray-100 lg:row-start-2 lg:hidden lg:justify-center lg:bg-gray-600 lg:bg-opacity-60 lg:from-transparent">
              <h1 className="font-bebas text-2xl opacity-70 sm:text-3xl lg:text-5xl">
                Variety of pools
              </h1>
            </div>
            <img
              src={hotelPool1}
              alt=""
              className="col-span-3 h-56 w-full sm:h-60"
            />
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h1 className="font-bebas text-primarydark hidden text-2xl opacity-70 lg:block lg:text-5xl">
              Variety of pools
            </h1>
            <h1 className="text-primarydark text-justify indent-8 font-sans text-sm drop-shadow">
              variety of exquisite pools, each designed to enhance your
              relaxation and enjoyment. The main pool is a sparkling blue oasis,
              perfect for a refreshing swim or lounging by the water on our
              comfortable sunbeds. Surrounded by lush greenery and beautifully
              landscaped gardens, it offers a serene and picturesque setting.
            </h1>
          </div>
        </section>
        <section className="flex w-full flex-col items-center gap-4 md:flex-row-reverse">
          <div className="grid h-40 w-full max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:max-w-sm md:h-60">
            <div className="z-10 col-span-3 row-span-1 row-start-3 flex items-center bg-gradient-to-t from-gray-600 px-4 text-gray-100 lg:row-start-2 lg:hidden lg:justify-center lg:bg-gray-600 lg:bg-opacity-60 lg:from-transparent">
              <h1 className="font-bebas text-2xl opacity-70 sm:text-3xl lg:text-5xl">
                Fine dining experience
              </h1>
            </div>
            <img
              src={hotelSalmon}
              alt=""
              className="col-span-3 h-56 w-full sm:h-60"
            />
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h1 className="font-bebas text-primarydark hidden self-end text-2xl opacity-70 lg:block lg:text-5xl">
              Fine dining experience
            </h1>
            <h1 className="text-primarydark text-justify indent-8 font-sans text-sm drop-shadow">
              At Mel Hotel, we elevate your dining experience to the
              extraordinary with our fine dining offerings. Our restaurant
              combines elegant ambiance with a menu crafted by our personal
              chef, who brings a wealth of culinary expertise to every dish.
              From succulent seafood to tender steaks and fresh, locally-sourced
              produce, each meal is a journey through rich flavors and artful
              presentations. Whether you’re enjoying a romantic dinner or a
              celebratory feast, our personalized service ensures that every
              detail is tailored to your taste, making your dining experience at
              Mel Hotel unforgettable.
            </h1>
          </div>
        </section>
        <section className="flex w-full flex-col items-center gap-4 md:flex-row">
          <div className="grid h-40 w-full max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded shadow drop-shadow sm:max-w-sm md:h-60">
            <div className="z-10 col-span-3 row-span-1 row-start-3 flex items-center bg-gradient-to-t from-gray-600 px-4 text-gray-100 lg:row-start-2 lg:hidden lg:justify-center lg:bg-gray-600 lg:bg-opacity-60 lg:from-transparent">
              <h1 className="font-bebas text-2xl opacity-70 sm:text-3xl lg:text-5xl">
                Exceptional Hospitality
              </h1>
            </div>
            <img
              src={hotelReceptionist}
              alt=""
              className="col-span-3 h-56 w-full sm:h-60"
            />
          </div>
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h1 className="font-bebas text-primarydark hidden text-2xl opacity-70 lg:block lg:text-5xl">
              Exceptional Hospitality
            </h1>
            <h1 className="text-primarydark text-justify indent-8 font-sans text-sm drop-shadow">
              At Mel Hotel, our staff and reception team are dedicated to making
              you feel at home from the moment you arrive. Friendly, attentive,
              and always ready to assist, they go above and beyond to ensure
              your stay is comfortable and enjoyable. Whether you need help with
              your luggage, local recommendations, or just a warm smile, our
              team is here to welcome you with open arms.
            </h1>
          </div>
        </section>
      </div>

      <footer id="#footer" className="flex h-96 w-full bg-gray-300 px-8 py-8">
        <Footer />
      </footer>
    </div>
  );
}
