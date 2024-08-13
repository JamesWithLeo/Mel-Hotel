import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense, useEffect, useState } from "react";
import { IUser } from "../redux slices/authSlice";

const AccountTable = lazy(() => import("./accountTable"));

export default function AccountCollection() {
  const [isTableVisible, setIsTableVisibility] = useState<boolean>(true);
  const [accountData, setAccountData] = useState<IUser[] | null>(null);
  async function fetchCollections() {
    await fetch("/admin/database/collections")
      .then(async (response) => {
        await response.json().then((dbCollections: IUser[]) => {
          setAccountData(dbCollections);
        });
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
          {isTableVisible ? (
            <button
              className="w-max rounded bg-white px-3 py-1 shadow drop-shadow"
              onClick={() => {
                setIsTableVisibility(!isTableVisible);
              }}
            >
              Hide Table
            </button>
          ) : (
            <button
              className="bg-gr w-max rounded bg-white px-3 py-1 shadow drop-shadow"
              onClick={() => {
                setIsTableVisibility(!isTableVisible);
              }}
            >
              Show table
            </button>
          )}

          {!isTableVisible ? null : (
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
          )}
        </>
      ) : null}
    </div>
  );
}
