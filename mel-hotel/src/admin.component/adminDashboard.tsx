import axios from "axios";
import { IUser } from "../redux slices/authSlice";
import { useEffect, useState } from "react";
import { IBookSlice } from "../redux slices/bookSlice";

export default function AdminDashboard() {
  const [newUsers, setNewUsers] = useState<IUser[]>([]);
  const [accounts, setAccounts] = useState<IUser[]>([]);
  const [isFetchingAccounts, setIsFetchingAccounts] = useState<boolean>(true);

  const fetchAccounts = async () => {
    const response = axios.get("/melhotel/collection", {
      params: { collection: "account" },
    });
    // set the filter new accounts
    response.then((value) => {
      setIsFetchingAccounts(false);
      if (value && value.data.length) {
        setAccounts(value.data);
        setNewUsers(
          value.data.filter(
            (value: IUser) =>
              value.role === "user" &&
              new Date(value.createdAt).toDateString() ===
                new Date().toDateString(),
          ),
        );
      }
    });
  };
  const [bookings, setBookings] = useState<IBookSlice[]>([]);
  const [newBookings, setNewBookings] = useState<IBookSlice[]>([]);
  const [activeBookings, setActiveBookings] = useState<IBookSlice[]>([]);
  const [isFetchingBookings, setIsFetchingBookings] = useState<boolean>(true);
  const [expireBookings, setExpireBookings] = useState<IBookSlice[]>([]);
  const fetchBookings = async () => {
    const response = axios.get("/melhotel/collection", {
      params: { collection: "book" },
    });
    response.then((value) => {
      setIsFetchingBookings(false);
      if (value && value.data.length) {
        setBookings(value.data);
        setNewBookings(
          value.data.filter(
            (value: IBookSlice) =>
              new Date(value.createdAt).toDateString() ===
              new Date().toDateString(),
          ),
        );
        setActiveBookings(
          value.data.filter(
            (value: IBookSlice) =>
              new Date(value.bookedDate).toDateString() ===
              new Date().toDateString(),
          ),
        );
      }
    });
  };
  useEffect(() => {
    fetchAccounts();
    fetchBookings();
  }, []);
  return (
    <main className="flex flex-col gap-1 p-2">
      <h1 className="font-mono text-xl font-bold text-slate-600">Dashboard</h1>

      <section className="font-fauna rounded border p-6">
        <div className="flex gap-1">
          <h1>Total user :</h1>
          {isFetchingAccounts ? <h1>Loading...</h1> : <>{accounts.length}</>}
        </div>

        <div className="flex gap-1">
          <h1>New user : </h1>
          {isFetchingAccounts ? (
            <h1>Loading...</h1>
          ) : (
            <h1>{newUsers.length}</h1>
          )}
        </div>
      </section>

      <section className="font-fauna rounded border p-6">
        <div className="flex gap-1">
          <h1>Total Bookings : </h1>
          {isFetchingBookings ? <h1>Loading...</h1> : <>{bookings.length}</>}
        </div>
        <div className="flex gap-1">
          <h1>Todays Bookings : </h1>
          {isFetchingBookings ? <h1>Loading...</h1> : <>{newBookings.length}</>}
        </div>

        <div className="flex gap-1">
          <h1>Active Bookings : </h1>
          {isFetchingBookings ? (
            <h1>Loading...</h1>
          ) : (
            <>{activeBookings.length}</>
          )}
        </div>
      </section>
    </main>
  );
}
