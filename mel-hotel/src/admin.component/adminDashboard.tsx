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
  // const [bookings, setBookings] = useState<IBookSlice[]>([]);
  const [activeBookings, setActiveBookings] = useState<IBookSlice[]>([]);
  const [pendingBookings, setPendingBookings] = useState<IBookSlice[]>([]);
  const [expireBookings, setExpireBookings] = useState<IBookSlice[]>([]);

  const [isFetchingBookings, setIsFetchingBookings] = useState<boolean>(true);
  const fetchBookings = async () => {
    const active = axios.get("/melhotel/collection", {
      params: { collection: "active" },
    });
    active.then((value) => {
      setIsFetchingBookings(false);
      if (value && value.data.length) {
        setActiveBookings(value.data);
      }
    });
    const pending = axios.get("/melhotel/collection", {
      params: { collection: "pending" },
    });
    pending.then((value) => {
      setIsFetchingBookings(false);
      if (value && value.data.length) {
        setPendingBookings(value.data);
      }
    });
    const expire = axios.get("/melhotel/collection", {
      params: { collection: "expire" },
    });
    expire.then((value) => {
      setIsFetchingBookings(false);
      if (value && value.data.length) {
        setExpireBookings(value.data);
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
          <h1>Pending Bookings : </h1>
          {isFetchingBookings ? (
            <h1>Loading...</h1>
          ) : (
            <>{pendingBookings.length}</>
          )}
        </div>

        <div className="flex gap-1">
          <h1>Active Bookings : </h1>
          {isFetchingBookings ? (
            <h1>Loading...</h1>
          ) : (
            <>{activeBookings.length}</>
          )}
        </div>

        <div className="flex gap-1">
          <h1>Expire Bookings : </h1>
          {isFetchingBookings ? (
            <h1>Loading...</h1>
          ) : (
            <h1>{expireBookings.length}</h1>
          )}
        </div>
      </section>
    </main>
  );
}
