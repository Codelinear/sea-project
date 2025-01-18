import React from "react";
import "./subscriptionmain.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const SubscriptionMain = ({ onButtonClick }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/get_subscriptions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.message === "Invalid token") {
          localStorage.removeItem("token");
          navigate("/login");
          window.location.reload();
        } else {
          setUserData(data); // Store fetched data in state
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Columns for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: "Product",
        accessor: "product_name",
      },
      {
        Header: "Tier",
        accessor: "product_tier_name",
      },
      {
        Header: "Remaining Credits",
        accessor: "remaining_credits",
      },
      {
        Header: "Billing Frequency",
        accessor: "billing_frequency",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ value }) =>
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(new Date(value)), // Format date
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ value }) =>
          value
            ? new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(value))
            : " ",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        Cell: ({ row }) =>
          row.original.status === "active" ? (
            <button
              className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-gray-300"
              onClick={() => handleAction(row.original)}
            >
              Action
            </button>
          ) : (
            ""
          ),
      },
    ],
    []
  );

  const handleAction = (rowData) => {
    alert(`Taking action for subscription ID: ${rowData.id}`);
  };

  // React-table instance
  const tableInstance = useTable({
    columns,
    data: userData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="subscription pl-[100px]">
      <div className="head-subscription mb-10">
        <h1>Subscription</h1>
      </div>
      <div className="table-container overflow-x-auto">
        {userData.length > 0 ? (
          <table
            {...getTableProps()}
            className="table-auto border-collapse border border-gray-300 w-full text-left"
          >
            <thead className="bg-gray-200">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-100 even:bg-gray-50"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No subscriptions available</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionMain;
