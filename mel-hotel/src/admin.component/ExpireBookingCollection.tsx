import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useState, lazy, useEffect } from "react";
import { IBookSlice } from "../redux slices/bookSlice";
import axios from "axios";

const BookTable = lazy(() => import("./ExpireBookingTable"));

export default function ExpireBookingCollection() {
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
              icon={faTable}
              className="text-4xl text-slate-400 md:text-5xl"
            />
          </div>
        }
      >
        {bookData ? <BookTable data={bookData} /> : null}
      </Suspense>
    </div>
  );
}
