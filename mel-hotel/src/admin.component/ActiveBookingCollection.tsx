import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { IBookSlice } from "../redux slices/bookSlice";

const BookTable = lazy(() => import("./ActiveBookingTable"));

export default function ActiveBookingCollection() {
  const [bookData, setBookData] = useState<IBookSlice[] | null>(null);
  const fetchBookings = async () => {
    await axios
      .get("/melhotel/collection/", { params: { collection: "active" } })
      .then(async (response) => {
        setBookData(response.data);
      });
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-2 px-4 py-4">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <FontAwesomeIcon
              className="text-4xl text-slate-400 md:text-5xl"
              icon={faTable}
            />
          </div>
        }
      >
        {bookData ? <BookTable data={bookData} /> : null}
      </Suspense>
    </div>
  );
}
