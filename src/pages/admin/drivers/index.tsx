import { Button, Input, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdAddCircle } from "react-icons/io";
import { api } from "~/utils/api";

const Drivers = () => {
  const { Search } = Input;
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [statusApproval, setStatusApproval] = useState<null | {id:string, status:"APPROVED" | "DECLINED"}>(null)
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "DECLINED">("APPROVED");

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
    status,
  });

  const  { mutate: updateStatus, isLoading: updateStatusLoading } = api.driver.updateStatusDriver.useMutation({
    onSuccess:async (data)=>{
      toast.success(data==="APPROVED" ? "Driver Successfully Approved" : "Driver Declined");
      setStatusApproval(null)
      await refetchDrivers()
    }
  });
  const columns: ColumnsType<any> = [
    {
      title: "Action",
      dataIndex: "id",
      align:"center",
      width:100,
      render:(data)=>(
        <div className=" gap-2 flex flex-row items-center justify-center w-full">
        <Button type="primary" onClick={()=>setApproval({id:data, status:"APPROVED"})}>Approve</Button>
        <Button  onClick={()=>setApproval({id:data, status:"DECLINED"})}>Decline</Button>
        </div>
      )
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

  const setApproval = ({id, status}: {id:string, status:"APPROVED" | "DECLINED"})=>{
    setStatusApproval({id,status})
  }
  const handleCancel = () => {
  setStatusApproval(null)
  }

  const _handleSelect = (value: number) => {
    setVehicleId(value);
  };

  const handleOk = () =>{
   if(statusApproval){
   return updateStatus({
     status: statusApproval.status,
     id: statusApproval.id
   })
   }
  }
  status !== "PENDING" && columns.shift()

  return (
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
    <Modal footer={[]} width={300} title={statusApproval?.status === "APPROVED" ? "Approve Driver":"Decline Driver"} open={statusApproval !== null} onOk={handleOk} onCancel={handleCancel}>
      <div className=" flex flex-col">
        <div>{statusApproval?.status === "APPROVED" ? "Confirm approval of this driver":"Confirm declination of this driver"}</div>
        <div className=" gap-2 flex flex-row mt-4 items-center justify-center w-full">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button disabled={updateStatusLoading}  type="primary" onClick={handleOk}>Confirm</Button>
        </div>
      </div>
    </Modal>
      <div className=" flex flex-1 flex-col">
        <div className=" min-h-96 flex flex-col rounded  bg-white">
          <div className=" flex w-full items-center justify-between">
            <div className=" flex w-3/5 flex-row gap-2 p-5 px-2 text-gray-500">
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
              <div className=" flex w-40 flex-col gap-1">
                <div>Status</div>
                <Select
                  className=" w-full"
                  size="large"
                  value={status}
                  onChange={setStatus}
                  options={[{label:"Approved", value:"APPROVED"},{label:"Pending", value:"PENDING"},{label:"Declined", value:"DECLINED"}]}
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
