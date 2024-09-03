import { useNavigate } from "react-router-dom";
import { IBookSlice } from "../redux slices/bookSlice";

export default function PackageCard({
  packageObject,
  status,
}: {
  packageObject: IBookSlice;
  status: "active" | "pending" | "expire";
}) {
  const navigate = useNavigate();
  const HandleClickCard = () => {
    navigate("/view", { state: packageObject });
  };
  let cardstyle = "";
  let packageStyle = "";
  switch (status) {
    case "active":
      cardstyle = "w-full rounded border p-2 bg-contrast sm:w-full sm:p-4";
      packageStyle =
        "font-fauna text-white text-contrast font-bold lg:font-extrabold";
      break;
    case "expire":
      cardstyle = "w-full rounded bg-gray-200 border p-2 sm:w-full sm:p-4";
      packageStyle = "font-fauna text-contrast font-bold lg:font-extrabold";
      break;
    case "pending":
      cardstyle = "w-full rounded border p-2 bg-blue-200 sm:w-full sm:p-4";
      packageStyle = "font-fauna text-contrast font-bold lg:font-extrabold";
      break;
  }
  return (
    <main className={cardstyle} onClick={HandleClickCard}>
      <span className="flex flex-col justify-between sm:flex-row">
        <h1 className={packageStyle}>{packageObject.hotelPackage}</h1>
        <h1 className="font-edu sm:text-right">{packageObject.location}</h1>
      </span>
      <h1 className="text-xs font-light sm:text-sm">
        Scheduled on :{" "}
        {packageObject.startingDate
          ? new Date(packageObject.startingDate).toDateString()
          : null}{" "}
      </h1>
      <h1 className="text-sm font-light">
        {packageObject.numberOfRooms} rooms for {packageObject.daysOfStaying}{" "}
        days
      </h1>
    </main>
  );
}
