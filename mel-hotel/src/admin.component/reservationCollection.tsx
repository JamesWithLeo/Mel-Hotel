import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationTable from "./reservationTable";
export type ReservationTypeface = {
  _id: string;
  AccountId: string;
  PackageType: string;
  DateOfBooking: string;
  ReservedDate: string;
  Country: string;
};
export default function ReservationCollection() {
  const [reservationData, setReservationData] = useState<
    ReservationTypeface[] | null
  >(null);
  const fetchReservation = async () => {
    await fetch("/admin/database/reservation").then(async (response) => {
      await response.json().then((value) => {
        console.log(value);
        setReservationData(value);
      });
    });
  };
  useEffect(() => {
    fetchReservation();
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-2 px-4 py-4">
      <h1>Reservation</h1>
      <Link
        to={"/admin/collections"}
        className="w-max rounded bg-white px-3 py-1 shadow drop-shadow"
      >
        Back
      </Link>
      {reservationData ? (
        <ReservationTable
          data={reservationData}
          RefreshData={fetchReservation}
        />
      ) : null}
    </div>
  );
}
