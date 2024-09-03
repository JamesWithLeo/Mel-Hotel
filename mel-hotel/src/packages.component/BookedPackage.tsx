import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../hotelStore";
import { Navigate } from "react-router-dom";
import { IBookSlice, Reset } from "../redux slices/bookSlice";
import axios from "axios";
import PackageCard from "./packageCard";
import { useLayoutEffect, useState } from "react";

export default function BookedPackage() {
  const user = useSelector((state: AppState) => state.auth.user);
  const dispatch = useDispatch();
  const [activeBookings, setActiveBookings] = useState<IBookSlice[]>([]);
  const [pendingBookings, setPendingBookings] = useState<IBookSlice[]>([]);
  const [expireBookings, setExpireBookings] = useState<IBookSlice[]>([]);

  const fetchBookings = () => {
    const response = axios.get("/melhotel/book/" + user?._id);
    response.then((value) => {
      setExpireBookings(value.data.expire);
      setPendingBookings(value.data.pending);
      setActiveBookings(value.data.active);
    });
  };
  useLayoutEffect(() => {
    dispatch(Reset());
    fetchBookings();
  }, []);

  if (!user) return <Navigate to={"/"} replace={true} />;
  return (
    <div className="flex h-full w-full flex-col p-2 sm:p-4">
      <h1 className="font-cinzel self-end">
        Todays Date : {new Date().toDateString()}
      </h1>
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
                    <PackageCard
                      packageObject={value}
                      status={"active"}
                      key={value._id}
                    />
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
                      <PackageCard
                        packageObject={value}
                        status={"pending"}
                        key={value._id}
                      />
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

          <div className="flex h-full flex-col gap-1 overflow-y-auto pb-8">
            {expireBookings ? (
              <>
                {expireBookings.map((value: IBookSlice) => {
                  return (
                    <PackageCard
                      packageObject={value}
                      status={"expire"}
                      key={value._id}
                    />
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
