import { useNavigate } from "react-router-dom";
import { IBookSlice } from "../redux slices/bookSlice";

export default function PackageCard({
  packageObject,
}: {
  packageObject: IBookSlice & { _id: string };
}) {
  const navigate = useNavigate();
  const HandleClickCard = () => {
    navigate("/view", { state: packageObject });
  };
  return (
    <main
      className="w-full rounded border p-2 sm:w-full sm:p-4"
      onClick={HandleClickCard}
    >
      <span className="flex flex-col justify-between sm:flex-row">
        <h1 className="font-fauna text-contrast font-bold lg:font-extrabold">
          {packageObject.hotelPackage}
        </h1>
        <h1 className="font-edu">{packageObject.location}</h1>
      </span>
      <h1 className="text-sm font-light">
        Scheduled on : {new Date(packageObject.scheduledDate).toUTCString()}
      </h1>
      <h1 className="text-sm font-light">
        {packageObject.numberOfRooms} rooms for {packageObject.daysOfStaying}{" "}
        days
      </h1>
    </main>
  );
}
