import hotelCozyroom from "../assets/images/hotelRoom-sm.jpg";
import hotelFacade from "../assets/images/hotel-scenries1.jpg";
import hotelPool1 from "../assets/images/luxury-pool.jpg";
import { Link } from "react-router-dom";
import Gallary from "./gallary";
import Footer from "../footer.component/footer";
export default function Home() {
  return (
    <div
      className="flex h-full w-full max-w-7xl flex-col items-center bg-gray-100"
      id="homeContainer"
    >
      <Gallary />

      <div className="mb-4 w-full py-4 text-center shadow">
        <h1 className="font-cinzel text-5xl font-medium text-[#4F4A45]">
          Mel Hotel
        </h1>
        <h1 className="font-edu text-xs text-neutral-500">
          Affordable Elegance, Unforgettable Escapes
        </h1>
      </div>
      <Link
        to={"book"}
        className="bg-contrast font-fauna active:text-primarydark mb-4 rounded-full px-5 py-1 shadow drop-shadow duration-200 ease-in-out hover:scale-x-[1.05] active:shadow-[inset_0px_2px_5px_5px_#0000004d]"
      >
        Book Now!
      </Link>

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
            <h1 className="font-bebas text-primarydark hidden text-2xl opacity-70 lg:block lg:text-5xl">
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
      </div>
      <footer id="#footer" className="flex h-96 w-full bg-gray-300 px-8 py-8">
        <Footer />
      </footer>
    </div>
  );
}
