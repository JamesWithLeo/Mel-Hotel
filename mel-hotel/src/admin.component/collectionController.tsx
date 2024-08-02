import { Link } from "react-router-dom";
export default function CollectionController() {
  return (
    <div className="h-full w-full px-4 py-4">
      <div className="flex flex-col gap-2">
        <h1 className="w-max">Collections</h1>
        <Link
          to={"accountCollection"}
          className="w-max rounded px-2 py-1 text-neutral-500 outline-1 outline-gray-200 hover:bg-gray-100 hover:text-gray-600 hover:shadow hover:outline"
        >
          Account
        </Link>
      </div>
    </div>
  );
}
