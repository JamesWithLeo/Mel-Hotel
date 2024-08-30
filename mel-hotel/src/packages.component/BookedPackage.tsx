import { useSelector } from "react-redux";
import { AppState } from "../hotelStore";
import { Navigate, useLocation } from "react-router-dom";
import { IBookSlice } from "../redux slices/bookSlice";
import axios from "axios";
import PackageCard from "./packageCard";
import { useQuery } from "@tanstack/react-query";

export default function BookedPackage() {
  const user = useSelector((state: AppState) => state.auth.user);
  const query = useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      const response = await axios.get("/melhotel/book/" + user?._id);
      return response.data;
    },
  });

  if (!user) return <Navigate to={"/"} replace={true} />;
  return (
    <div className="flex h-full w-full flex-row p-2 sm:p-4">
      <section className="flex h-full w-full flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex h-max w-full flex-col bg-white md:h-full">
          <h1 className="font-cinzel text-sm text-gray-400">Active Package</h1>

          <div className="flex flex-col gap-1 overflow-y-auto pb-8">
            {!query.isLoading ? (
              <>
                {query.data && query.data.length
                  ? query.data.map((value: IBookSlice & { _id: string }) => {
                      if (
                        new Date().toDateString() ===
                        new Date(value.scheduledDate).toDateString()
                      )
                        return (
                          <PackageCard packageObject={value} key={value._id} />
                        );
                    })
                  : null}
              </>
            ) : null}
          </div>
        </div>

        <div className="h-1/2 w-full overflow-y-hidden md:h-full">
          <h1 className="font-cinzel text-sm text-gray-400">Pending Package</h1>

          <div className="flex h-full flex-col gap-1 overflow-y-auto pb-8">
            {!query.isLoading ? (
              <>
                {query.data && query.data.length
                  ? query.data.map((value: IBookSlice & { _id: string }) => {
                      if (
                        new Date().toDateString() !==
                        new Date(value.scheduledDate).toDateString()
                      )
                        return (
                          <PackageCard packageObject={value} key={value._id} />
                        );
                    })
                  : null}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
