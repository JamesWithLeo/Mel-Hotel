import { Link, useLocation, useNavigate } from "react-router-dom";
import { IBookSlice } from "../redux slices/bookSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faQrcode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
export default function ViewPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageObject: IBookSlice & { _id: string } = location.state;
  const [isVisibleQr, setIsVisibleQr] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const HandleAbort = async () => {
    await axios
      .delete("/melhotel/book/" + packageObject._id)
      .then((response) => {
        if (response.data.deletedCount)
          return navigate("/package", { replace: true, state: null });
      })
      .catch((reason) => {
        console.log(reason);
      });
  };
  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(packageObject))
      .then((url) => {
        setQrCode(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {isVisibleQr ? (
        <>
          <div
            className="fixed z-10 h-full w-dvw bg-white bg-opacity-30 backdrop-blur"
            onClick={() => {
              setIsVisibleQr(false);
            }}
          />

          <div className="absolute left-1/2 top-1/2 z-10 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 flex-col gap-1 bg-white shadow drop-shadow">
            <img id="qrcode" src={qrCode} alt="QR Code" />
            <h1 className="text-primarydarker text-center text-sm">
              Please <em className="font-bold text-red-500">do not</em> share
              this qr code to non Mel hotel personel.
            </h1>
          </div>
        </>
      ) : null}

      <main className="flex h-full w-full flex-col gap-1 p-2 sm:p-4">
        <div className="flex w-full flex-row justify-between">
          <Link to={"/package"} className="text-primarydarker h-max w-max">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <button
            className="text-contrast font-bebas flex h-max w-max gap-1 rounded px-2 py-1 shadow"
            onClick={() => {
              setIsVisibleQr(true);
            }}
          >
            qr code
            <FontAwesomeIcon icon={faQrcode} className="text-xl" />
          </button>
        </div>
        <section className="">
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
            {packageObject.numberOfRooms} rooms for{" "}
            {packageObject.daysOfStaying} , Amounting of $
            {packageObject.totalPrice}
            days
          </h1>
          <Link
            to={"/" + packageObject.hotelPackage}
            className="text-sm text-blue-600 underline-offset-2 hover:underline"
          >
            view Inclusions
          </Link>
        </section>

        <button
          className="absolute bottom-4 w-max self-end rounded bg-red-400 px-4 py-1 text-red-700 shadow"
          onClick={HandleAbort}
        >
          Abort package
        </button>
      </main>
    </>
  );
}
