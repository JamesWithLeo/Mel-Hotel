import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../hotelStore";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { SetUser } from "../redux slices/authSlice";

export default function ActivePackage() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: AppState) => state.auth.user);
  if (user === null) return <Navigate to={"/"} replace={true} />;
  const handleAbort = async () => {
    if (
      window.confirm(`Are you sure you want to abort this package?\n
      This is irreversable`)
    ) {
      axios
        .post("/account/update/" + user._id, { Active: null })
        .then((value) => {
          console.log(value.data);
          dispatch(SetUser(value.data));
        });
    }
  };
  return (
    <div className="flex h-full w-full flex-col gap-8 px-4 py-4">
      <div className="flex flex-col bg-white">
        <h1 className="font-mono text-sm text-gray-300">Active Package</h1>
      </div>
      <div className="flex gap-4">
        <button className="text-contrast w-max rounded px-4 py-1 shadow drop-shadow">
          Reschedule
        </button>
        <button className="text-contrast w-max rounded px-4 py-1 shadow drop-shadow">
          Qr code
        </button>
        <button className="text-contrast w-max rounded px-4 py-1 shadow drop-shadow">
          Extend
        </button>
      </div>
      <button
        className="w-max rounded bg-red-500 px-4 py-1 text-white shadow"
        onClick={handleAbort}
      >
        Abort this booked package
      </button>
    </div>
  );
}
