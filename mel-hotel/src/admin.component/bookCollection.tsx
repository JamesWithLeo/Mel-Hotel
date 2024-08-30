import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookTable from "./bookTable";
import axios from "axios";
import { IBookSlice } from "../redux slices/bookSlice";
export type ReservationTypeface = {
  _id: string;
  AccountId: string;
  PackageType: string;
  DateOfBooking: string;
  ReservedDate: string;
  Country: string;
};
export default function BookCollection() {
  const [isTableVisible, setIsTableVisibility] = useState<boolean>(true);
  const [bookData, setBookData] = useState<IBookSlice[] | null>(null);
  const fetchReservation = async () => {
    await axios.get("/admin/database/book").then(async (response) => {
      console.log(response.data);
      setBookData(response.data);
    });
  };
  useEffect(() => {
    fetchReservation();
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-2 px-4 py-4">
      {isTableVisible ? (
        <button
          className="w-max rounded px-3 py-1 hover:bg-white"
          onClick={() => {
            setIsTableVisibility(!isTableVisible);
          }}
        >
          Hide Table
        </button>
      ) : (
        <button
          className="bg-gr w-max rounded px-3 py-1 hover:bg-white"
          onClick={() => {
            setIsTableVisibility(!isTableVisible);
          }}
        >
          Show table
        </button>
      )}
      {isTableVisible ? (
        <>
          {bookData ? (
            <BookTable data={bookData} RefreshData={fetchReservation} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
