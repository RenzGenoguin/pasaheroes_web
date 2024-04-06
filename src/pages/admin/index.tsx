import { DatePicker, Select, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import RideDetailsModal from "~/components/RideDetailsModal";
import { api } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const Admin = () => {
  const [rideType, setRideType] = useState<null | string>(null);
  const [ridesModal, setRidesModal] = useState<any>(null);
  const [ridesDate, setRidesDate] = useState(dayjs().toDate());

  const { data: rides, isLoading: ridesIsLoading } =
    api.dashboard.getRidesByDateAndStatus.useQuery(
      {
        date: dayjs(ridesDate).toDate(),
        status: rideType,
      },
      {
        enabled: !!ridesDate,
      },
    );
  console.log(rides);
  const _handleSelect = (e: any) => {
    setRideType(e);
  };

  const onChangeDateRides = (date: Date) => {
    setRidesDate(date);
  };

  const textToDisplay = () => {
    if (
      dayjs(ridesDate).format("MM DD YYYY") === dayjs().format("MM DD YYYY")
    ) {
      return "Trips Today";
    } else {
      return `Trips on ${dayjs(ridesDate).format("MMM DD, YYYY")}`;
    }
  };

  const vehicleTypeOptions = [
    {
      label: "All",
      value: null,
    },
    {
      label: "Riding",
      value: "riding",
    },
    {
      label: "Done",
      value: "done",
    },
  ];

  const columns = [
    {
      title: "Trip Started",
      key: "rode",
      width: 130,
      dataIndex: "createdAt",
      render: (data: any) => `${dayjs(data).fromNow()}`,
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
      title: "Vehicle Type",
      key: "vht",
      dataIndex: "Driver",
      render: (data: any) => `${data?.vehicleType.vehicleType}`,
    },
    {
      title: "Driver",
      dataIndex: "Driver",
      key: "name",
      render: (data: any) => <>{`${data?.fullName}`}</>,
    },
    {
      title: "Pasahero",
      dataIndex: "Pasahero",
      key: "name",
      render: (data: any) => <>{`${data.firstName} ${data.lastName}`}</>,
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
    <div className=" flex  flex-1 flex-col gap-2 px-5">
      <RideDetailsModal
        detailsModal={ridesModal}
        setDetailsModal={setRidesModal}
      />
      <div className=" flex flex-row items-end justify-between gap-3 px-2">
        <div className=" flex items-end justify-end text-4xl font-semibold text-gray-500">
          <span>{textToDisplay()}</span>
        </div>
        <div className=" flex flex-row items-center gap-3">
          <div className=" flex w-40 flex-col gap-1">
            <div>Trip Status</div>
            <Select
              className=" w-full"
              size="large"
              value={rideType}
              onChange={_handleSelect}
              options={vehicleTypeOptions}
            />
          </div>
          <div className=" flex w-40 flex-col gap-1">
            <div className="">Date of </div>
            <DatePicker
              onChange={onChangeDateRides as any}
              defaultValue={dayjs(ridesDate)}
              disabledDate={(d) => dayjs(d).isAfter()}
              format={"MMM DD, YYYY"}
              size="large"
            />
          </div>
        </div>
      </div>
      <div className=" overflow-hidden rounded-xl shadow">
        <Table
          dataSource={rides ?? []}
          columns={columns as any}
          scroll={{ y: 350 }}
          loading={ridesIsLoading}
          // pagination={false}
          className=" h-full  overflow-hidden rounded bg-white"
        />
      </div>
    </div>
  );
};

export default Admin;
