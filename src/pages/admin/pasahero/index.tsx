import { Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { api } from "~/utils/api";

const Pasaheros = () => {
  const { Search } = Input;
  const router = useRouter();
  const [searchText, setSearchText] = useState("");


  const {
    data: pasaheros,
    refetch: refetchPasaheros,
    isLoading: pasaherosIsLoading,
  } = api.pasahero.getAllPasahero.useQuery({
    searchText,
  });


  const columns: ColumnsType<any> = [
    {
      title: "ID No.",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "View Pasahero's Details",
      align: "center",
      width: 200,
      render: (data: any) => (
        <div
          onClick={() => router.push(`/admin/pasaherosDetails/${data.id}`)}
          className=" flex cursor-pointer flex-row items-center justify-center gap-2 text-blue-700 hover:text-blue-500"
        >
          View Details
        </div>
      ),
    },
  ];



  return (
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
      <div className=" flex flex-1 flex-col">
        <div className=" min-h-96 flex flex-col rounded  bg-white">
          <div className=" flex w-full items-center justify-between">
            <div className=" flex w-2/5 flex-row gap-2 p-5 px-2 text-gray-500">
              <div className=" flex flex-1 flex-col gap-1">
                <div>Search Pasahero</div>
                <Search
                  width={10}
                  className=" flex-1"
                  placeholder="Pasahero's Name"
                  size="large"
                  onSearch={(e) => setSearchText(e)}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchText("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <Table
            // rowSelection={rowSelection}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={pasaheros}
            loading={pasaherosIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Pasaheros;
