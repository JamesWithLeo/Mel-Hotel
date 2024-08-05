import { useNavigate } from "react-router-dom";
import Gallary, { carouselTypeface } from "../home.component/gallary";
import { hotelStore } from "../hotelStore";
import { Logout } from "../redux slices/authSlice";

export default function Profile() {
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
  const navigate = useNavigate();
  const handleLogout = () => {
    hotelStore.dispatch(Logout());
    navigate("/", { replace: true });
  };
  return (
    <div className="flex h-svh w-full max-w-7xl flex-col items-center bg-gray-100">
      <div className="w-full opacity-80">
        <Gallary settings={settings} />
      </div>

      <div className="absolute left-16 top-32 h-20 w-20 rounded bg-gray-200 p-2 sm:h-32 sm:w-32">
        .
      </div>
      <h1 className="text-primarydarker absolute left-40 top-36 rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-44">
        Username
      </h1>
      <h1 className="text-primarydarker absolute left-40 top-44 rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-56">
        Id :
      </h1>

      <div className="mb-1 flex h-max w-full items-center justify-end gap-1 px-8 py-1">
        <div className="h-full w-[2px] bg-gray-400">
          <hr />
        </div>
        <button className="text-primarydarker hover:bg-primarydarker bg-gray-100 px-2 py-1 hover:text-white">
          Booked
        </button>
        <div className="h-full w-[2px] bg-gray-400">
          <hr />
        </div>
        <button className="text-primarydarker hover:bg-primarydarker bg-gray-100 px-2 py-1 hover:text-white">
          Write Review
        </button>
        <div className="h-full w-[2px] bg-gray-400">
          <hr />
        </div>
      </div>
      <div className="max text-primarydarker grid grid-cols-2 items-center gap-2 self-start px-8 md:pl-24">
        <h1 className="font-fauna w-max align-middle">Gmail</h1>
        <input
          value={hotelStore.getState().auth.gmail || ""}
          type="text"
          readOnly
          className="w-max px-2 py-1"
        />

        <h1 className="font-fauna w-max align-middle">Password</h1>
        <input className="w-max px-2 py-1" />

        <h1 className="font-fauna w-max align-middle">Address</h1>
        <input className="w-max px-2 py-1" />

        <h1 className="font-fauna w-max align-middle">contact</h1>
        <input className="w-max px-2 py-1" />

        <button
          className="w-max rounded bg-gray-50 px-3 py-1 shadow hover:drop-shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
