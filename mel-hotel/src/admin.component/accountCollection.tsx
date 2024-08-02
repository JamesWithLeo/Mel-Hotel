import { Document } from "mongodb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function AccountCollection() {
  const [accountElements, setAccountElements] = useState<JSX.Element[] | null>(
    null,
  );
  useEffect(() => {
    async function fetchCollections() {
      await fetch("/admin/database/collections")
        .then(async (response) => {
          await response.json().then((dbCollections: Document[]) => {
            console.log(dbCollections);
            const accountEl = dbCollections.map((doc) => {
              return (
                <div className="bg-slate-500" key={doc._id}>
                  <h1>{doc._id}</h1>
                </div>
              );
            });
            setAccountElements(accountEl);
          });
        })
        .catch((rej) => {
          console.log({ rejected: rej });
        });
    }

    fetchCollections();
  }, []);

  return (
    <div className="flex h-full w-full flex-col px-4 py-4">
      <Link to={"/admin/collections"}>back</Link>
      {accountElements ? (
        <>
          {accountElements.length ? (
            accountElements
          ) : (
            <h1>collection/table empty</h1>
          )}
        </>
      ) : null}
      {/* <table className="borde table-auto border-separate">
        <caption>
          <h1>Account Collection</h1>
        </caption>
        <thead className="bg-gray-400">
          <tr>
            <th scope="col">UID</th>
            <th scope="col">Gmail</th>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="border-b border-gray-300">
            <th scope="row">34024093</th>
            <th scope="row">James@gmail.com</th>
            <th scope="row">James Leo</th>
            <th scope="row">0912345669</th>
            <button onClick={() => console.log("edit")}>Edit</button>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}
