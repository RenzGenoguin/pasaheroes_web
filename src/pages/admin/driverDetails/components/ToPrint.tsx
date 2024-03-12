import QRCode from "react-qr-code";

const ToPrint = ({ componentRef, driverData }: any) => {
  return (
    <div
      id="toprint"
      ref={componentRef}
      className=" flex flex-col items-center justify-center p-10"
    >
      <div className=" -mb-1 flex-col">Plate No.</div>
      <div className=" flex-col text-2xl font-semibold text-gray-800">
        {driverData?.plateNo}
      </div>
      <div className=" mb-3 flex-col text-lg text-gray-700">
        ( {driverData?.vehicleType?.vehicleType} )
      </div>
      <QRCode value={(driverData?.id as string) || ("" as string)} size={400} />
      <div className=" -mb-1 mt-3 flex-col">Driver</div>
      <div className=" flex-col text-2xl font-semibold uppercase text-gray-800">
        {driverData?.fullName}
      </div>
    </div>
  );
};

export default ToPrint;
