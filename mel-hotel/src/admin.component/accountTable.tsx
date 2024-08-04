import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Row,
  type MRT_ColumnDef,
  MRT_EditActionButtons,
  MRT_TableOptions,
} from "material-react-table";

import { useMemo } from "react";
import { AccountTypeface, GenderTypeface } from "./accountCollection";

const AccountTable = ({
  data,
  RefreshData,
}: {
  data: AccountTypeface[];
  RefreshData: () => Promise<void>;
}) => {
  const genderDropDownOption: GenderTypeface[] = ["male", "female", "others"];
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<AccountTypeface>[]>(
    () => [
      {
        id: "_id",
        accessorKey: "_id",
        header: "User Id",
        enableEditing: false,
        size: 150,
        maxSize: 240,
        enableSorting: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: "Gmail",
        header: "Gmail",
        size: 150,
        maxSize: 240,
        enableClickToCopy: true,
      },
      {
        accessorKey: "Password",
        header: "Password",
        maxSize: 240,
        size: 150,
        enableSorting: false,
        columnDefType: "group",
      },
      {
        accessorKey: "Age",
        header: "Age",
        size: 130,
        maxSize: 140,
        enableSorting: true,
      },
      {
        accessorKey: "Gender",
        header: "Gender",
        size: 130,
        maxSize: 140,
        enableSorting: false,
        editVariant: "select",
        editSelectOptions: genderDropDownOption,
      },
    ],
    [],
  );

  const handleCreateAccount: MRT_TableOptions<AccountTypeface>["onCreatingRowSave"] =
    async ({ table, values }) => {
      const { Gmail, Password, Gender, Age }: AccountTypeface = { ...values };
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
  const handleDeleteAccount = async (row: MRT_Row<AccountTypeface>) => {
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
  const handleEditAccount: MRT_TableOptions<AccountTypeface>["onEditingRowSave"] =
    async ({ values, table }) => {
      const accountBody = JSON.stringify({
        Gmail: values.Gmail,
        Password: values.Password,
      });
      await fetch(`/admin/database/account/update/${values._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: accountBody,
      }).then(async (response) => {
        await response.json().then((value) => {
          console.log(value);
        });
      });
      table.setEditingRow(null);
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
    // muiTableBodyCellProps: {
    //   sx: {
    //     border: "1px solid rgb(243 244 246)",
    //   },
    // },
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },

    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
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
      <div className="p-2">
        <button
          className="rounded bg-white px-2 py-1 text-gray-500 shadow hover:text-gray-600 hover:drop-shadow"
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
        <h1>{row.original.Gmail}</h1>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default AccountTable;
