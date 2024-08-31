import { useSelector } from "react-redux";
import { AppState } from "../hotelStore";
import { Navigate } from "react-router-dom";
import { IBookSlice } from "../redux slices/bookSlice";
import axios from "axios";
import PackageCard from "./packageCard";
import { useLayoutEffect, useState } from "react";

export default function BookedPackage() {
  const user = useSelector((state: AppState) => state.auth.user);

  const [activeBookings, setActiveBookings] = useState<IBookSlice[]>([]);
  const [pendingBookings, setPendingBookings] = useState<IBookSlice[]>([]);
  const [expireBookings, setExpireBookings] = useState<IBookSlice[]>([]);

  const fetchBookings = () => {
    const response = axios.get("/melhotel/book/" + user?._id);
    response.then((value) => {
      if (value.data && value.data.length) {
        setExpireBookings(
          value.data.filter((bookings: IBookSlice) => {
            let diff = bookings.bookedDate - new Date().getTime();
            if (diff / (1000 * 60 * 60 * 24) <= -1) return true;
          }),
        );
        setPendingBookings(
          value.data.filter((bookings: IBookSlice) => {
            if (bookings.bookedDate > new Date().getTime()) return true;
          }),
        );
        setActiveBookings(
          value.data.filter((bookings: IBookSlice) => {
            if (
              new Date(bookings.bookedDate).toDateString() ===
              new Date().toDateString()
            )
              return true;
          }),
        );
      }
    });
  };
  useLayoutEffect(() => {
    fetchBookings();
  });

  if (!user) return <Navigate to={"/"} replace={true} />;
  return (
    <div className="flex h-full w-full flex-row p-2 sm:p-4">
      <section className="flex h-full w-full flex-col gap-2 md:flex-row md:justify-between md:gap-2">
        <div className="flex h-max flex-col bg-white md:h-full md:w-1/3">
          <h1 className="font-cinzel text-primarydarker text-sm">
            Active Package
          </h1>

          <div className="flex flex-col gap-1 overflow-y-auto pb-8">
            {activeBookings ? (
              <>
                {activeBookings.map((value) => {
                  return (
                    <PackageCard packageObject={value} status={"active"} />
                  );
                })}
              </>
            ) : null}
          </div>
        </div>

        <div className="h-max overflow-y-hidden md:h-full md:w-1/3">
          <h1 className="font-cinzel text-primarydarker text-sm">
            Pending Package
          </h1>

          <div className="flex h-full flex-col gap-1 overflow-y-auto pb-8">
            <>
              {pendingBookings ? (
                <>
                  {pendingBookings.map((value) => {
                    return (
                      <PackageCard packageObject={value} status={"pending"} />
                    );
                  })}
                </>
              ) : null}
            </>
          </div>
        </div>

        <div className="h-max overflow-y-hidden md:h-full md:w-1/3">
          <h1 className="font-cinzel text-primarydarker text-sm">
            Expire Package
          </h1>
          {expireBookings ? (
            <>
              {expireBookings.map((value: IBookSlice) => {
                return <PackageCard packageObject={value} status={"expire"} />;
              })}
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}
