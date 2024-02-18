import { Divider, Rate } from "antd";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import { api } from "~/utils/api";
import { FaEdit, FaStar } from "react-icons/fa";
import dayjs from "dayjs";
import ToPrint from "./components/ToPrint";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const DriveDetails = () => {
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { data: driverData, isLoading: driverDetailsIsLoading } =
    api.driver.getDriver.useQuery(
      {
        id: router.query.id as string,
      },
      {
        enabled: !!router.query.id,
      },
    );

  if (driverDetailsIsLoading || !router.query.id) {
    return (
      <div className=" flex h-full w-full items-center justify-center">
        Loading ...
      </div>
    );
  }

  const handleEditDriverDetails = () => {
    router.push(`/admin/editDriver/${router.query.id}`);
  };

  return driverData ? (
    <div className=" flex h-full flex-col gap-2 p-5 pt-0">
      <ToPrint componentRef={componentRef} driverData={driverData} />
      <div className=" flex h-2/5 flex-none flex-row rounded-xl bg-gray-50 p-3 px-5 shadow lg:px-10">
        <div className=" flex-1 ">
          <div className=" flex flex-col">
            <div className=" flex flex-row items-center justify-between">
              <div className=" flex flex-row items-center gap-2">
                <div className=" text-base">Driver's Rating :</div>
                <Rate
                  allowHalf
                  character={<FaStar size={30} />}
                  disabled
                  value={3.4}
                />
                <div className=" mb-1 flex items-center justify-center text-lg text-gray-500">
                  ( {3.4} )
                </div>
              </div>
              <div
                onClick={handleEditDriverDetails}
                className=" flex cursor-pointer flex-row items-center justify-center gap-2 rounded px-2 py-1 text-orange-300 hover:bg-orange-100 hover:text-orange-500"
              >
                <FaEdit />
                <div>Edit Driver's Details</div>
              </div>
            </div>
            <div className=" flex flex-row  gap-3 px-0 2xl:px-5">
              <div className="p-0 2xl:p-2">
                <div className=" mb-2">Driver's Photo</div>
                <div className=" h-60 w-60 overflow-hidden rounded-lg bg-white shadow">
                  <img
                    src={driverData.profileUrl}
                    alt="Driver's Photo"
                    className=" h-full w-full object-contain"
                  />
                </div>
              </div>
              <div className=" flex-1 p-2">
                <div className=" mb-2">Driver's Details</div>
                <div className=" ml-2 mt-6 flex flex-col gap-2 border-0 border-l-8 border-solid border-green-500 p-4 py-0 text-base">
                  <div className=" flex items-center gap-1 text-base text-gray-400">
                    Name :
                    <span className=" text-lg font-medium text-gray-600">
                      {driverData.fullName}
                    </span>
                  </div>
                  <div className=" flex items-center gap-1 text-base text-gray-400">
                    Plate Number :
                    <span className=" text-lg font-medium text-gray-600">
                      {driverData.plateNo}
                    </span>
                  </div>
                  <div className=" flex items-center gap-1 text-base text-gray-400">
                    Vehicle Type :
                    <span className=" text-lg font-medium text-gray-600">
                      {driverData.vehicleType.vehicleType}
                    </span>
                  </div>
                  <div className=" flex items-center gap-1 text-base text-gray-400">
                    Contact Number :
                    <span className=" text-lg font-medium text-gray-600">
                      {driverData.contactNo}
                    </span>
                  </div>
                  <div className=" flex items-center gap-1 text-base text-gray-400">
                    Home Address :
                    <span className=" text-lg font-medium text-gray-600">
                      {driverData.address}
                    </span>
                  </div>
                  <div className=" text-gray-5\400 flex items-center gap-1 text-base">
                    Date Registered :
                    <span className=" text-lg font-medium text-gray-600">
                      {dayjs(driverData.createdAt).format("MMMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-5 rounded border-0 border-l-2 border-solid border-gray-200"></div>
        <div className=" flex flex-col items-center justify-between  gap-2 p-2">
          <button
            className=" flex-none cursor-pointer rounded border-none bg-blue-700 px-3 py-1"
            onClick={handlePrint}
          >
            Print Driver's QR Code
          </button>
          <div className=" flex items-center justify-center overflow-hidden rounded-lg bg-white">
            <QRCode value={(driverData.id as string) || ("" as string)} />
          </div>
        </div>
      </div>
      <div className=" flex flex-1 flex-row  gap-2 rounded-xl">
        <div className=" flex-1 rounded-xl bg-gray-50 shadow">1</div>
        <div className=" flex-1 rounded-xl bg-gray-100 shadow">1</div>
      </div>
    </div>
  ) : (
    <div className=" flex h-full w-full items-center justify-center">
      No User Found
    </div>
  );
};

export default DriveDetails;
