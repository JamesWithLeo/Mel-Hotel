import {
  MaterialReactTable,
  MRT_Row,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_TableOptions,
} from "material-react-table";
import { useMemo } from "react";
import { ReservationTypeface } from "./reservationCollection";

const pacakgeDropDownOption = ["ordinary", "regular", "premium", "luxury"];
const countryDropDownOption = [
  "Philippines",
  "Swizterland",
  "Shanghai",
  "Saudi Arabia",
];
export default function ReservationTable({
  data,
  RefreshData,
}: {
  data: ReservationTypeface[];
  RefreshData: () => void;
}) {
  const handleDeleteReservation = async (row: MRT_Row<ReservationTypeface>) => {
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

  const handleSaveEditReservation: MRT_TableOptions<ReservationTypeface>["onEditingRowSave"] =
    async ({ values, table }) => {
      const editedReservation = JSON.stringify({
        PackageType: values.PackageType,
        ReservedDate: values.ReservedDate,
      });
      await fetch(`/admin/database/reservation/update/${values._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: editedReservation,
      }).then(async (response) => {
        await response.json().then((values) => {
          console.log(values);
        });
      });
      table.setEditingRow(null);
    };

  const columns = useMemo<MRT_ColumnDef<ReservationTypeface>[]>(
    () => [
      {
        id: "_id",
        accessorKey: "_id",
        header: "Reservation Id",
        size: 150,
        maxSize: 240,
        enableClickToCopy: true,
        enableEditing: false,
        enableSorting: false,
        enableGrouping: false,
        enableColumnActions: false,
        enablePinning: false,
      },
      {
        id: "ReservedDate",
        accessorKey: "ReservedDate",
        header: "ReservedDate",
        size: 150,
      },
      {
        id: "DateOfBooking",
        accessorKey: "DateOfBooking",
        header: "Data of booking",
        enableEditing: false,
        size: 150,
      },
      {
        id: "PackageType",
        accessorKey: "PackageType",
        header: "Package",
        size: 100,
        editVariant: "select",
        enableSorting: false,
        editSelectOptions: pacakgeDropDownOption,
      },
      {
        id: "AccountId",
        accessorKey: "AccountId",
        header: "User id",
        size: 150,
        enableEditing: false,
        enableClickToCopy: true,
        enableSorting: false,
      },
      {
        id: "Country",
        accessorKey: "Country",
        header: "Country",
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
    getRowId: (row) => row._id,
    enableRowActions: true,
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgb(243 244 246)",
      },
    },
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    editDisplayMode: "modal",
    enableEditing: true,
    onEditingRowSave: handleSaveEditReservation,

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
