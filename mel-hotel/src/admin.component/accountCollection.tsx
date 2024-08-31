import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense, useEffect, useState } from "react";
import { IUser } from "../redux slices/authSlice";
import axios from "axios";

const AccountTable = lazy(() => import("./accountTable"));

export default function AccountCollection() {
  const [accountData, setAccountData] = useState<IUser[] | null>(null);
  async function fetchCollections() {
    await axios
      .get("/melhotel/collection", { params: { collection: "account" } })
      .then((dbCollections) => {
        setAccountData(dbCollections.data);
      })
      .catch((rej) => {
        console.log({ rejected: rej });
      });
  }
  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 px-4 py-4">
      {accountData ? (
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
            <AccountTable data={accountData} RefreshData={fetchCollections} />
          </Suspense>
        </>
      ) : null}
    </div>
  );
}
