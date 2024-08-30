import {
  MaterialReactTable,
  MRT_Row,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IBookSlice } from "../redux slices/bookSlice";
import { Link } from "react-router-dom";
const countryDropDownOption = [
  "Philippines",
  "Swizterland",
  "Shanghai",
  "Saudi Arabia",
];
export default function BookTable({
  data,
  RefreshData,
}: {
  data: IBookSlice[];
  RefreshData: () => void;
}) {
  const handleDeleteReservation = async (row: MRT_Row<IBookSlice>) => {
    if (window.confirm("Are you sure want to delete this Reservation? ")) {
      await fetch(`/admin/database/reservation/delete/${row.original._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(async (respone) => {
          await respone.json().then((value) => {
            console.log(value);
            RefreshData();
          });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  const columns = useMemo<MRT_ColumnDef<IBookSlice>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "_id",
        size: 100,
        maxSize: 240,
        enableClickToCopy: true,
        enableEditing: false,
        enableSorting: false,
        enableGrouping: false,
        enableColumnActions: false,
        enablePinning: false,
      },
      {
        accessorKey: "uid",
        header: "uid",
        size: 100,
        maxSize: 240,
        enableClickToCopy: true,
        enableEditing: false,
        enableSorting: false,
      },
      {
        accessorKey: "hotelPackage",
        header: "Type",
        enableEditing: false,
        enableSorting: false,
        size: 100,
      },
      {
        accessorKey: "daysOfStaying",
        header: "days",
        size: 50,
        enableSorting: true,
        enableEditing: false,
      },
      {
        accessorKey: "numberOfRooms",
        header: "rooms",
        size: 50,
        enableEditing: false,
        enableClickToCopy: true,
        enableSorting: true,
      },
      {
        accessorKey: "location",
        header: "location",
        enableEditing: true,
        enableSorting: false,
        editVariant: "select",
        editSelectOptions: countryDropDownOption,
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableColumnActions: false,
    // getRowId: (row) => row._id,
    enableRowActions: true,
    muiTableBodyCellProps: {
      sx: {
        border: "1px dashed rgb(243 244 246)",
      },
    },
    initialState: {
      density: "compact",
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    editDisplayMode: "modal",
    enableEditing: false,
    renderTopToolbarCustomActions: () => {
      return [
        <div className="flex items-center gap-2 font-bold text-gray-500">
          <Link
            to={"/admin/"}
            className="w-max rounded bg-white px-3 py-1 hover:bg-gray-100"
          >
            Back
          </Link>
        </div>,
      ];
    },
    renderRowActionMenuItems: ({ row }) => {
      const handleDelete = () => {
        handleDeleteReservation(row);
      };
      return [
        <div className="flex flex-col">
          <button
            className="px-8 py-2 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>,
      ];
    },
  });
  return <MaterialReactTable table={table} />;
}
