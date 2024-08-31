import {
  MaterialReactTable,
  MRT_Row,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { IBookSlice } from "../redux slices/bookSlice";
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
        maxSize: 150,
      },
      {
        accessorKey: "daysOfStaying",
        header: "days",
        maxSize: 100,
        size: 50,
        enableSorting: true,
        enableEditing: false,
      },
      {
        accessorKey: "numberOfRooms",
        header: "rooms",
        size: 50,
        maxSize: 100,
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
        maxSize: 200,
      },
      {
        accessorKey: "createdAt",
        accessorFn(originalRow) {
          return new Date(originalRow.createdAt).toLocaleString();
        },
        header: "createdAt",
        enableSorting: false,
        maxSize: 200,
      },
      {
        header: "BookedDate",
        accessorFn(originalRow) {
          return new Date(originalRow.bookedDate).toLocaleDateString();
        },
        maxSize: 200,
      },
      {
        header: "Amount",
        accessorKey: "totalPrice",
        size: 150,
        maxSize: 200,
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
    enableRowActions: true,
    initialState: {
      density: "compact",
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {
        _id: false,
        uid: false,
        totalPrice: false,
      },
    },
    muiColumnActionsButtonProps: {
      size: "small",
      sx: {
        fontSize: "10px",
      },
    },
    muiFilterSliderProps: {
      size: "small",
      sx: {
        fontSize: "10px",
      },
    },
    muiSkeletonProps: {
      sx: {
        fontSize: "10px",
      },
    },
    muiTableFooterProps: {
      sx: {
        fontSize: "10px",
      },
    },
    muiTableContainerProps: {
      sx: {
        fontSize: "10px",
      },
    },
    muiTableFooterRowProps: {
      sx: {
        fontSize: "10px",
      },
    },
    muiBottomToolbarProps: {
      fontSize: "10px",
      sx: {
        fontSize: "10px",
      },
    },
    muiSearchTextFieldProps: {
      size: "small",
      sx: {},
      variant: "standard",
    },

    muiPaginationProps: {
      size: "small",
      color: "primary",
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "outlined",
      sx: {
        backgroundColor: "pink",
        fontSize: "10px",
      },
    },
    positionPagination: "bottom",
    muiTableHeadCellProps: {
      size: "small",
      sx: {
        fontSize: "12px",
        fontFamily: "monospace",
        paddingX: "1rem",
        boxShadow: "none",
        fontWeight: "600",
      },
    },
    muiTableBodyCellProps: {
      size: "small",
      sx: {
        paddingX: "1rem",
        fontSize: "12px",
        color: "GrayText",
        boxShadow: "none",
        fontFamily: "monospace",
      },
    },
    muiTablePaperProps: {
      sx: {
        fontSize: "10px",
        borderRadius: "1rem",
        boxShadow:
          " rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
      },
    },
    muiTableBodyProps: {
      sx: {
        boxShadow: "none",
      },
    },

    muiTableProps: {
      sx: {
        fontSize: "10px",
        boxShadow: "none",
      },
    },

    editDisplayMode: "modal",
    enableEditing: false,
    autoResetExpanded: true,

    autoResetPageIndex: false,
    renderTopToolbarCustomActions: () => {
      return [
        <div className="flex items-center gap-2 font-bold text-gray-500"></div>,
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
