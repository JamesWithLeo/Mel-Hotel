import { useNavigate, Navigate } from "react-router-dom";
import Gallary, { carouselTypeface } from "../home.component/gallary";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux slices/authSlice";
import { AppDispatch, AppState } from "../hotelStore";

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
export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  const { user } = useSelector((state: AppState) => state.auth);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="flex h-svh w-full max-w-7xl flex-col items-center bg-gray-100">
      <div className="w-full opacity-80">
        <Gallary settings={settings} />
      </div>
      <div className="absolute left-8 top-32 flex gap-4 sm:left-8">
        <div className="left-[10%] top-[15%] h-20 w-20 rounded bg-gray-200 p-2 sm:top-[20%] sm:h-32 sm:w-32">
          .
        </div>
        <div className="flex flex-col gap-4 self-end">
          <h1 className="text-primarydarker left-[32%] top-[18%] h-max rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-44">
            {user.FirstName} {user.LastName}
          </h1>
          <h1 className="text-primarydarker left-[32%] top-[21%] h-max rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-56">
            Id : {user._id}
          </h1>
        </div>
      </div>

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
        <h1 className="font-fauna w-max align-middle">Gmail : {user.Gmail}</h1>
        <input
          type="email"
          readOnly
          className="w-max px-2 py-1"
          defaultValue={user.Gmail}
        />

        <h1 className="font-fauna w-max align-middle">Password</h1>
        <input className="w-max px-2 py-1" defaultValue={user.Password} />

        <h1 className="font-fauna w-max align-middle">Address</h1>
        <input className="w-max px-2 py-1" defaultValue={user.Address} />

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
