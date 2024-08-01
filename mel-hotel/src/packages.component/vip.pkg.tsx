import {
  Reset,
  IncrementDays,
  DecrementDays,
  SetBookedDate,
} from "../redux slices/vipSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import PackageDeal from "./packageButton";
import { AppState } from "../hotelStore";

import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { packagesData } from "./packagesObj";
let date = new Date().toLocaleDateString().split("/");
if (date[0].length === 1) {
  date[0] = 0 + date[0];
}

export default function Hotel() {
  const dateToday = [date[2], date[0], date[1]].join("-");

  const onIncrementBookedDays = () => {
    dispatch(IncrementDays());
  };

  const onDecrementBookedDays = () => {
    dispatch(DecrementDays());
  };
  const onResetBooking = () => {
    dispatch(Reset());
  };

  const onSetDate = () => {
    let date = document.getElementById("scheduleDateInput") as HTMLInputElement;
    // if book, current or later
    if (date.value >= date.min) {
      let sep = date.value.split("-");
      dispatch(SetBookedDate([sep[1], sep[2], sep[0]].join("/")));
    }
  };

  const vipBooking = useSelector((state: AppState) => state.vipBooking);
  const dispatch = useDispatch();
  const [packagesElement, setPackages] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const packagesEl = packagesData.map((data) => {
      return (
        <PackageDeal
          thumbnail={data.thumbnail}
          PackageName={data.packageName}
          key={crypto.randomUUID()}
        />
      );
    });
    setPackages(packagesEl);
  }, []);
  const [isVisibleConfig, setIsVisibleConfig] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center">
      <div className="flex h-full w-full max-w-7xl flex-col flex-wrap justify-center md:flex-row">
        <div className="fixed bottom-0 flex w-full flex-col items-center bg-gray-100 shadow md:relative md:h-dvh md:w-1/4">
          <div className="flex h-8 w-full justify-start px-4 md:h-16 md:px-8">
            <Link
              to={"/book"}
              className="text-primarydarker flex items-center text-left font-bold"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-contrast text-base"
              />
              <h1 className="hidden sm:block">back</h1>
            </Link>
          </div>
          <h1 className="font-cinzel test-sm text-center text-base md:text-base">
            Mel Hotel provides three tailored hotel packages
          </h1>
          <h1 className="text-sm">Choose a package: </h1>
          {packagesElement.length ? packagesElement : null}

          {isVisibleConfig ? (
            <div className="flex w-full flex-col items-center gap-2 px-2 py-2 md:mt-8 md:gap-8">
              <div className="outline-primarydarker flex w-full flex-col items-center justify-between gap-2 rounded bg-white px-4 py-4 shadow">
                <h1 className="flex items-center font-mono text-neutral-500">
                  Days of Staying : {vipBooking.daysOfStaying}
                </h1>
                <div className="drop-shadow">
                  <button
                    className="text-contrast h-full bg-gray-100 px-4"
                    onClick={onDecrementBookedDays}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button
                    className="text-contrast h-full bg-gray-100 px-4"
                    onClick={onIncrementBookedDays}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="outline-primarydarker flex h-max w-full flex-col items-center justify-between gap-2 rounded bg-white px-4 py-4 shadow">
                <label
                  htmlFor="scheduleDateInput"
                  className="flex items-center font-mono text-neutral-500"
                >
                  Scheduled date: {vipBooking.scheduledDate}
                </label>
                <input
                  className="text-contrast bg-gray-100 px-2 drop-shadow"
                  type="date"
                  id="scheduleDateInput"
                  required
                  min={dateToday}
                  onChange={onSetDate}
                />
              </div>
              <div className="flex gap-4 self-end">
                <button
                  onClick={onResetBooking}
                  className="rounded bg-red-200 px-4 py-1 text-sm text-red-400 shadow drop-shadow"
                >
                  Reset
                </button>
                <button
                  className="self-end rounded bg-white px-2 py-1 text-sm text-gray-400 shadow drop-shadow"
                  onClick={() => {
                    setIsVisibleConfig(false);
                  }}
                >
                  Hide
                </button>
              </div>
            </div>
          ) : (
            <button
              className="my-2 mr-2 self-end rounded bg-white px-2 py-1 text-sm text-gray-400 shadow drop-shadow"
              onClick={() => {
                setIsVisibleConfig(true);
              }}
            >
              Configure
            </button>
          )}
        </div>
        <div className="flex md:w-3/4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
