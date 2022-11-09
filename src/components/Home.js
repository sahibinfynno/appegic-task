import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      field: "user_id",
      headerName: "User ID",
      sortable: false,
      type: "number",
      width: 150,
    },
    {
      field: "first_name",
      headerName: "First name",
      sortable: false,
      width: 180,
    },
    {
      field: "last_name",
      headerName: "Last name",
      sortable: false,
      width: 180,
    },
    {
      field: "city",
      headerName: "City",
      sortable: false,
      width: 180,
    },
    {
      field: "pincode",
      headerName: "Pincode",
      sortable: false,
      width: 180,
    },
  ];

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get("http://localhost:3000/users", { params: { search: searchTerm } })
        .then((response) => setUserData(response?.data))
        .catch((err) => console.error(err));
    }, 400);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <div className="h-screen flex flex-col gap-14 justify-start items-center px-96">
      <div className="flex justify-between items-center h-1/10 w-full mt-20">
        <span className="text-xl font-semibold">User Details :</span>
        <input
          type="text"
          className="border border-gray-400 shadow-sm self-end px-3 py-1 rounded-md outline-1 focus:border-none focus:outline-1 focus:outline-blue-500"
          placeholder="Search by City"
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
      </div>
      <div className="h-[631px] flex justify-start w-full shadow-md">
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableColumnMenu={true}
          getRowId={(row) => row.user_id}
        />
      </div>
    </div>
  );
};

export default Home;
