import { Input, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { api } from "~/utils/api";

const Drivers = () => {
  const { Search } = Input;
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [vehicleId, setVehicleId] = useState<number>(0);

  const { data: vehicleType } = api.vehicleType.getAllvehicleTypes.useQuery({
    searchText: "",
    withOptionFormat: true,
  });

  const {
    data: drivers,
    refetch: refetchDrivers,
    isLoading: driverIsLoading,
  } = api.driver.getAllDriver.useQuery({
    searchText,
    vehicleId: vehicleId ? vehicleId : null,
  });

  const columns: ColumnsType<any> = [
    {
      title: "Plate Number",
      dataIndex: "plateNo",
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      render: (data) => {
        return <>{data.vehicleType}</>;
      },
    },
    {
      title: "View Driver's Details",
      align: "center",
      width: 200,
      render: (data: any) => (
        <div
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => router.push(`/admin/driverDetails/${data.id}`)}
          className=" flex cursor-pointer flex-row items-center justify-center gap-2 text-blue-700 hover:text-blue-500"
        >
          View Details
        </div>
      ),
    },
  ];

  const vehicleTypeOptions = [
    { value: 0, label: "All" },
    ...(vehicleType ?? []),
  ];

  const _handleSelect = (value: number) => {
    setVehicleId(value);
  };

  return (
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
      <div className=" flex flex-1 flex-col">
        <div className=" min-h-96 flex flex-col rounded  bg-white">
          <div className=" flex w-full items-center justify-between">
            <div className=" flex w-2/5 flex-row gap-2 p-5 px-2 text-gray-500">
              <div className=" flex flex-1 flex-col gap-1">
                <div>Search Driver</div>
                <Search
                  width={10}
                  className=" flex-1"
                  placeholder="Driver's Plate No. or Name"
                  size="large"
                  onSearch={(e) => setSearchText(e)}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchText("");
                    }
                  }}
                />
              </div>
              <div className=" flex w-40 flex-col gap-1">
                <div>Vehicle Type </div>
                <Select
                  className=" w-full"
                  size="large"
                  value={vehicleId}
                  onChange={_handleSelect}
                  options={vehicleTypeOptions}
                />
              </div>
            </div>

            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => router.push("addDriver")}
              className="flex cursor-pointer items-center gap-2  rounded border-none bg-blue-600 px-5 py-1 text-base text-white hover:brightness-110"
            >
              <div className=" flex items-center justify-start text-xl text-white">
                <IoMdAddCircle />
              </div>
              Add New Driver
            </button>
          </div>
          <Table
            // rowSelection={rowSelection}
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={drivers}
            loading={driverIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
