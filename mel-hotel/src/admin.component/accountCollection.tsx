import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccountTable = lazy(() => import("./accountTable"));
export type GenderTypeface = "male" | "female" | "others";
export type AccountTypeface = {
  _id: string;
  Gmail: string;
  Password: string;
  Age: number;
  Gender: GenderTypeface;
};

export default function AccountCollection() {
  const [isTableVisible, setIsTableVisibility] = useState<boolean>(true);
  const [accountData, setAccountData] = useState<AccountTypeface[] | null>(
    null,
  );
  async function fetchCollections() {
    await fetch("/admin/database/collections")
      .then(async (response) => {
        await response.json().then((dbCollections: AccountTypeface[]) => {
          console.log(dbCollections);
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
      <Link
        to={"/admin/collections"}
        className="w-max rounded bg-white px-3 py-1 shadow drop-shadow"
      >
        back
      </Link>
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
