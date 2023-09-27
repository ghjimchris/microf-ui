import React from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";

const columns = [
  {
    label: "Age",
    field: "age",
  },
  {
    label: "Full Name",
    field: "first_name",
  },
  {
    label: "Email",
    field: "email",
  },
  {
   label: "Account Number",
   field: "account_number",
  },
  {
    label: "Actions",
    field: "actions",
  },
];

// Create a function to render the action buttons for each row
const renderActions = (row) => (
  <div className="flex">
    <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
      Edit
    </button>
    <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2">
      Delete
    </button>
  </div>
);

const rows = tableData.slice(0, 7);

const BasicTablePage = () => {
  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
      <Card title="View Clients" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.age}</td>
                      <td className="table-td">{row.first_name}</td>
                      <td className="table-td">{row.email}</td>
                      <td className="table-td">{row.account_number}</td>
                      <td className="table-td">{renderActions(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicTablePage;
