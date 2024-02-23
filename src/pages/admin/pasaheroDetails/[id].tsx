import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import RideDetailsModal from "./components/RideDetailsModal";
dayjs.extend(relativeTime);

const PasaherosDetails = () => {
    const router = useRouter();
    const [detailsModal, setDetailsModal]  = useState<any>(null);

    const { data: pasaheroData, isLoading: pasaheroDetailsIsLoading } = api.pasahero.getPasahero.useQuery(
      {
        id: parseInt(router.query.id as string),
      },
      {
        enabled: !!router.query.id,
      },
    );
    if (pasaheroDetailsIsLoading || !router.query.id) {
      return (
        <div className=" flex h-full w-full items-center justify-center">
          Loading ...
        </div>
      );
    }
    const columns: ColumnsType<any> = [
      {
        title: "Trip Started",
        dataIndex: "startRide",
        render: (data: any) => `${dayjs(data).fromNow()}`,
      },
      {
        title: "Driver",
        dataIndex: "Driver",
        width: 150,
        render: (data: any) => (
          <div
          >
            {data.fullName}
          </div>
        ),
      },
      {
        title: "Vehicle Type",
        dataIndex: "Driver",
        width: 150,
        render: (data: any) => (
          <div
          >
            {data.vehicleType.vehicleType}
          </div>
        ),
      },
      {
        title: "Status",
        dataIndex: "endRide",
        render: (data: any) => (
          data? <div className=" text-green-500">Done</div>:<div className=" text-orange-500">Riding</div>
        ),
      },
      {
        title: "View Pasahero's Details",
        align: "center",
        width: 200,
        render: (data: any) => (
          <div
            onClick={() => setDetailsModal(data)}
            className=" flex cursor-pointer flex-row items-center justify-center gap-2 text-blue-700 hover:text-blue-500"
          >
            View Details
          </div>
        ),
      },
    ];
    
    return ( pasaheroData?
    <div className="  h-full pb-10 px-5 flex justify-center">
      <RideDetailsModal detailsModal={detailsModal} setDetailsModal={setDetailsModal}/>
        <div className=" w-full md:w-11/12 lg:w-4/5 xl:w-3/5 bg-gray-50 shadow flex-none rounded-lg p-5 flex flex-col">
            <div className=" flex flex-row w-full h-52 ">
              <div className="p-0 2xl:p-2">
                <div className=" mb-2">Pasahero's Photo</div>
                <div className=" h-40 w-40 overflow-hidden rounded-lg bg-white shadow">
                  <img
                    src={pasaheroData.profileUrl as string}
                    alt="Driver's Photo"
                    className=" h-full w-full object-contain"
                  />
                </div>
              </div>
            <div className="p-0 2xl:p-2 w-full">
              <div className=" mb-2">Pasahero's Information</div>
              <div className=" p-2 px-4 flex flex-col w-full">
                <div className=" flex flex-col w-full">
                  <div className=" text-gray-600 font-medium text-3xl">{pasaheroData.fullName}</div>
                </div>
                <div className=" p-2 px-4 flex flex-row w-full">
                  <div className=" flex  flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-1 text-xs">Gender</span> 
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {pasaheroData.gender}
                    </span>
                  </div>
                  <div className=" flex flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-1 text-xs">Address</span> 
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {pasaheroData.address}
                    </span>
                  </div>
                  </div>
                <div className=" p-2 px-4 flex flex-row w-full">
                  <div className=" flex  flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-1 text-xs">Contact Number</span> 
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                    {pasaheroData.contactNo? <span>{pasaheroData.contactNo}</span>: <span className=" text-gray-400 text-sm">{"( None )"}</span>}
                    </span>
                  </div>
                  <div className=" flex flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-1 text-xs">Emergency Contact Number</span> 
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {pasaheroData.emergencyContact}
                    </span>
                  </div>
                  </div>
              </div>
            </div>
            </div>
              <div className=" flex-1 flex flex-col">
                <div className=" pl-5 text-gray-600 font-semibold text-xl">Trip History</div>
              <div className=" bg-white overflow-hidden rounded-md shadow mt-3">
            <Table
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={pasaheroData.Ride}
            loading={pasaheroDetailsIsLoading}
            />
            </div>
            </div>
        </div>
    </div>:<></>
    )
}
export default PasaherosDetails