import { DatePicker, Table } from "antd";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const RidesHistory = ({
  ridesDate,
  onChangeDateRides,
  driverRides,
  driverRidesIsLoading,
  setRidesModal,
}: any) => {
  const columns = [
    {
      title: "Pasahero",
      dataIndex: "Pasahero",
      key: "name",
      render: (data: any) => <>{`${data.firstName} ${data.lastName}`}</>,
    },
    {
      title: "Status",
      key: "status",
      width: 80,
      render: (data: any) => (
        <>
          {data?.endRide ? (
            <div className=" text-green-500">Done</div>
          ) : (
            <div className=" text-orange-500">Riding</div>
          )}
        </>
      ),
    },
    {
      title: "Trip Started",
      key: "rode",
      width: 150,
      dataIndex: "createdAt",
      render: (data: any) => `${dayjs(data).fromNow()}`,
    },
    {
      title: "Details",
      width: 100,
      align: "center",
      key: "details",
      render: (data: any) => (
        <div
          onClick={() => {
            setRidesModal(data);
          }}
          className=" cursor-pointer text-blue-700 hover:text-blue-500"
        >
          View
        </div>
      ),
    },
  ];
  return (
    <div className=" flex h-full flex-1 flex-col gap-2 rounded-xl bg-gray-100 p-3 shadow">
      <div className=" flex flex-row items-center justify-between gap-2 px-2">
        <div className=" flex-1 text-base font-medium text-gray-700">
          Driver's Passengers History
        </div>
        <div className=" flex flex-1 items-center justify-end gap-2">
          <div className="">Date of </div>
          <DatePicker
            onChange={onChangeDateRides}
            defaultValue={dayjs(ridesDate)}
            format={"MMM DD, YYYY"}
          />
        </div>
      </div>
      <Table
        dataSource={driverRides || []}
        columns={columns as any}
        scroll={{ y: 350 }}
        loading={driverRidesIsLoading}
        // pagination={false}
        className=" h-full  overflow-hidden rounded bg-white"
      />
    </div>
  );
};

export default RidesHistory;
