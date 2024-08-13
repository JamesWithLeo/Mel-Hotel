import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Row,
  type MRT_ColumnDef,
  MRT_EditActionButtons,
  MRT_TableOptions,
} from "material-react-table";
import { IUser } from "../redux slices/authSlice";
import { useMemo } from "react";
import { GenderTypeface, AuthTypeface } from "../redux slices/authSlice";
import { useNavigate } from "react-router-dom";

const AccountTable = ({
  data,
  RefreshData,
}: {
  data: IUser[];
  RefreshData: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const genderDropDownOption: GenderTypeface[] = ["male", "female", "others"];
  const authTypeDropDownOption: AuthTypeface[] = ["user", "admin"];
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        id: "_id",
        accessorKey: "_id",
        header: "User Id",
        enableEditing: false,
        size: 110,
        maxSize: 240,
        enableSorting: false,
        enableClickToCopy: true,
        enableColumnDragging: false,
      },
      {
        accessorKey: "Gmail",
        header: "Gmail",
        size: 130,
        maxSize: 240,
        enableClickToCopy: true,
        enableColumnDragging: false,
      },
      {
        accessorKey: "Password",
        header: "Password",
        maxSize: 240,
        size: 150,
        enableSorting: false,
        enableGrouping: false,
        enableHiding: true,
      },
      {
        accessorKey: "AuthType",
        header: "Type",
        size: 100,
        maxSize: 150,
        enableEditing: true,
        enableSorting: false,
        editVariant: "select",
        editSelectOptions: authTypeDropDownOption,
      },
      {
        accessorKey: "Age",
        header: "Age",
        size: 100,
        maxSize: 140,
        enableSorting: true,
      },
      {
        accessorKey: "Gender",
        header: "Gender",
        size: 100,
        maxSize: 140,
        enableSorting: false,
        editVariant: "select",
        editSelectOptions: genderDropDownOption,
      },
      {
        accessorKey: "FirstName",
        header: "First name",
        size: 100,
        enableSorting: true,
        enableClickToCopy: true,
        enableColumnDragging: false,
      },
      {
        accessorKey: "LastName",
        header: "Surname",
        size: 100,
        enableSorting: true,
        enableClickToCopy: true,
        enableColumnDragging: false,
      },
      {
        accessorKey: "Address",
        header: "Address",
        size: 130,
        enableSorting: true,
        enableClickToCopy: true,
        enableColumnDragging: true,
      },
      {
        accessorKey: "Birthdate",
        header: "birthdate y-m-d",
        enableSorting: true,
        size: 100,
        enableClickToCopy: true,
        enableColumnDragging: true,
      },
      {
        accessorKey: "Contact",
        header: "Contact",
        enableSorting: false,
        size: 100,
        enableClickToCopy: true,
        enableColumnDragging: false,
      },
    ],
    [],
  );

  const handleCreateAccount: MRT_TableOptions<IUser>["onCreatingRowSave"] =
    async ({ table, values }) => {
      const { Gmail, Password, Gender, Age }: IUser = { ...values };
      if (Gmail && Password && Gender && Age) {
        const newAccount = JSON.stringify({ Gmail, Password, Gender, Age });
        await fetch("/admin/database/account/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newAccount,
        }).then(async (response) => {
          await response.json().then((value) => {
            console.log(value.insertedId);
            RefreshData();
            table.setCreatingRow(null);
          });
        });
      }
    };
  const handleDeleteAccount = async (row: MRT_Row<IUser>) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? " + row.original.Gmail,
      )
    ) {
      console.log(row.original._id);
      await fetch(`/admin/database/account/delete/${row.original._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          await response.json().then((value) => {
            console.log(value);
            RefreshData();
          });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  const handleEditAccount: MRT_TableOptions<IUser>["onEditingRowSave"] =
    async ({ values, table }) => {
      const accountBody = JSON.stringify({
        Gmail: values.Gmail,
        Password: values.Password,
        AuthType: values.AuthType,
        Age: values.Age,
        Gender: values.Gender,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
      });
      await fetch(`/account/update/${values._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: accountBody,
      }).then(async (response) => {
        await response.json().then((value) => {});
      });
      table.setEditingRow(null);
    };

  const handleback = () => {
    navigate("/admin/collections");
  };

  const table = useMaterialReactTable({
    columns,
    data,
    //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowPinning: true,
    // enableTopToolbar: false,
    // enableBottomToolbar: false,

    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnResizing: true,
    enableColumnActions: false,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: false,
    enableExpandAll: true,
    enableColumnDragging: true,
    getRowId: (row) => row._id,

    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,

      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {
        Password: false,
        AuthType: false,
        Birthdate: false,
        Address: false,
        Gender: false,
        Contact: false,
      },
    },

    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiTableProps: {
      size: "small",
    },
    muiTableBodyCellProps: {
      size: "small",
    },
    muiTableHeadCellProps: {
      size: "small",
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "standard",
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "text",
    },

    enableEditing: true,
    editDisplayMode: "modal",
    onEditingRowSave: handleEditAccount,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div className="flex w-full flex-col gap-4 px-8 py-4">
        <h1 className="text-xl">Edit Account</h1>
        {internalEditComponents}
        <div className="flex w-full justify-end gap-8">
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </div>
      </div>
    ),

    positionCreatingRow: "bottom",
    createDisplayMode: "modal",
    onCreatingRowCancel: () => {},
    onCreatingRowSave: handleCreateAccount,
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex gap-2 p-2">
        <button
          className="rounded bg-white px-2 py-1 text-gray-700 shadow hover:text-gray-600 hover:drop-shadow"
          onClick={handleback}
        >
          Back
        </button>
        <button
          className="rounded bg-white px-2 py-1 text-gray-700 shadow hover:text-gray-600 hover:drop-shadow"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create Account
        </button>
      </div>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div className="flex flex-col gap-4 bg-gray-200 p-8">
        {internalEditComponents}
        <div className="flex w-full justify-end">
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </div>
      </div>
    ),
    renderRowActionMenuItems: ({ closeMenu, row }) => {
      const handleDelete = () => {
        handleDeleteAccount(row);
      };
      return [
        <div className="flex flex-col gap-2 py-1">
          <button
            className="px-8 py-2 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="px-8 py-2 hover:bg-gray-100">Call</button>
        </div>,
      ];
    },

    renderDetailPanel: ({ row }) => (
      <div>
        {row.original.Active ? (
          <div className="rounded bg-gray-100 px-2 py-1">
            <h1>Active booking</h1>
            <h1>{row.original.Active.hotelPackage}</h1>
            <h1>Location: {row.original.Active.location}</h1>
            <h1>Rooms: {row.original.Active.numberOfRooms}</h1>
            <h1>Days: {row.original.Active.daysOfStaying}</h1>
          </div>
        ) : (
          <h1>No Active booking</h1>
        )}
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default AccountTable;
