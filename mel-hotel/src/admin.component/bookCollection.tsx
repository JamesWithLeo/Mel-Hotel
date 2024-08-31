import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { IBookSlice } from "../redux slices/bookSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const BookTable = lazy(() => import("./bookTable"));
export type ReservationTypeface = {
  _id: string;
  AccountId: string;
  PackageType: string;
  DateOfBooking: string;
  ReservedDate: string;
  Country: string;
};
export default function BookCollection() {
  const [bookData, setBookData] = useState<IBookSlice[] | null>(null);
  const fetchBookings = async () => {
    await axios.get("/admin/database/book").then(async (response) => {
      setBookData(response.data);
    });
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-2 px-4 py-4">
      <>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <FontAwesomeIcon
                icon={faTable}
                className="text-4xl text-slate-400 md:text-5xl"
              />
            </div>
          }
        >
          {bookData ? (
            <BookTable data={bookData} RefreshData={fetchBookings} />
          ) : null}
        </Suspense>
      </>
    </div>
  );
}
