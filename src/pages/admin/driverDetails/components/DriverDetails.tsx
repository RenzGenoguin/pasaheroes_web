import { Button, Divider, Image, Modal, Rate } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import QRCode from "react-qr-code";

const DriverDetails = ({
  handlePrint,
  handleEditDriverDetails,
  driverData,
  updateStatus,
  updateStatusLoading,
}: any) => {
  const [statusApproval, setStatusApproval] = useState<null | {id:string, status:"APPROVED" | "DECLINED"}>(null)
  const setApproval = ({id, status}: {id:string, status:"APPROVED" | "DECLINED"})=>{
    setStatusApproval({id,status})
  }
  const handleCancel = () => {
  setStatusApproval(null)
  }
  const handleOk =async () =>{
   if(statusApproval){
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await updateStatus({
     status: statusApproval.status,
     id: statusApproval.id
   })
    handleCancel()
   }
  }
  return (
    <div className=" flex h-2/5 flex-none flex-row rounded-xl  p-3 px-5 shadow lg:px-10">
    <Modal footer={[]} width={300} title={statusApproval?.status === "APPROVED" ? "Approve Driver":"Decline Driver"} open={statusApproval !== null} onOk={handleOk} onCancel={handleCancel}>
      <div className=" flex flex-col">
        <div>{statusApproval?.status === "APPROVED" ? "Confirm approval of this driver":"Confirm declination of this driver"}</div>
        <div className=" gap-2 flex flex-row mt-4 items-center justify-center w-full">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button disabled={updateStatusLoading}  type="primary" onClick={handleOk}>Confirm</Button>
        </div>
      </div>
    </Modal>
      <div className=" flex-1 ">
        <div className=" flex flex-col  h-full">
          <div className=" flex flex-row items-center justify-between">
            {driverData?.status === "APPROVED" ? <div className=" flex flex-row items-center gap-2">
              <div className=" text-base">{"Driver's Rating :"}</div>
              <Rate
                allowHalf
                character={<FaStar size={30} />}
                disabled
                value={parseFloat(driverData?.rating?.toFixed(1))}
              />
              <div className=" mb-1 flex items-center justify-center text-lg text-gray-500">
                ({" "}
                {driverData?.rating !== null
                  ? driverData?.rating.toFixed(1)
                  : "No Rating"}{" "}
                )
              </div>
            </div>: <div className={` px-3 p-1 border border-solid ${driverData?.status === "PENDING" ? "border-orange-400 text-orange-400":"border-red-400 text-red-400"} text-sm mx-3 rounded`}>{driverData?.status}</div>}
            <div
              onClick={handleEditDriverDetails}
              className=" flex cursor-pointer flex-row items-center justify-center gap-2 rounded px-2 py-1 text-orange-300 hover:bg-orange-100 hover:text-orange-500"
            >
              <FaEdit />
              <div>Edit Driver's Details</div>
            </div>
          </div>
          <div className=" flex flex-row  gap-3 px-0 2xl:px-5 h-full">
            <div className="p-0 2xl:p-2">
              <div className=" mb-2">Driver's Photo</div>
              <div className=" h-56 w-full overflow-hidden rounded-lg bg-white shadow">
                <img
                  src={driverData?.profileUrl}
                  alt="Driver's Photo"
                  className=" h-full w-full object-contain"
                />
              </div>
            </div>
            <div className=" flex-1 p-2">
              <div className=" mb-2">Driver's Details</div>
              <div className=" ml-2 mt-2 flex flex-col gap-2 border-0 border-l-8 border-solid border-green-500 p-4 py-0 text-base">
                <div className=" flex flex-row items-center gap-10">
                  <div className=" flex flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-2 text-xs">Name</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.fullName}
                    </span>
                  </div>
                  <div className=" flex  flex-1 flex-col text-base text-gray-400">
                    <span className=" -mb-2 text-xs">Gender</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.gender}
                    </span>
                  </div>
                </div>
                <Divider className=" p-0 m-0" />
                <div className=" flex flex-row items-center gap-10">
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">Address</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.address}
                    </span>
                  </div>
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">Contact Number</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.contactNo}
                    </span>
                  </div>
                </div>
                <Divider className=" p-0 m-0" />
                <div className=" flex flex-row items-center gap-10">
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">Vehicle Type</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.vehicleType.vehicleType}
                    </span>
                  </div>
                  {driverData?.registrationId && <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">Plate Number</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.plateNo}
                    </span>
                  </div>}
                </div>
                {!driverData?.registrationId ? <>
                <Divider className=" p-0 m-0" />
                <div className=" flex flex-row items-center gap-10">
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">License Number</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                      {driverData?.licenceNo}
                    </span>
                  </div>
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">License Expiration</span>
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                    {dayjs(driverData?.licenceExpiration).format("MMMM DD, YYYY")}
                    <span className=" ml-1 text-lg font-medium text-gray-600">
                    {dayjs().isBefore(dayjs(driverData?.licenceExpiration))? <span className=" px-2 text-green-500">Active</span>:<span className=" px-2 text-red-500">Expired</span>}
                    </span>
                    </span>
                  </div>
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-2 text-xs">License Photo</span>
                    <span className=" -mb-2 text-xs py-1 rounded overflow-hidden">
                    Click to view : 
                    <span className=" ml-1 text-lg font-medium text-gray-600 rounded overflow-hidden">
                      {driverData?.licencePhotoUrl?
                    <Image className=" rounded" alt="licence" width={50} height={30} src={driverData?.licencePhotoUrl}/>:
                    <>No Photo</>}
                    </span>
                    </span>
                  </div>
                </div></>: 
                  <div className=" flex flex-col text-base  flex-1 text-gray-400">
                    <span className=" -mb-1 text-xs">Certificate Photo</span>
                    <span className=" -mb-2 text-xs py-1 rounded overflow-hidden">
                    Click to view : 
                    <span className=" ml-1 text-lg font-medium text-gray-600 rounded overflow-hidden">
                      {driverData?.licencePhotoUrl?
                    <Image className=" rounded" alt="licence" width={50} height={30} src={driverData?.licencePhotoUrl}/>:
                    <>No Photo</>}
                    </span>
                    </span>
                  </div>}
                <Divider className=" p-0 m-0" />
                <div className=" text-gray-400 flex items-center gap-1 text-base">
                  Date Registered :
                  <span className=" text-lg font-medium text-gray-600">
                    {dayjs(driverData?.createdAt).format("MMMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {driverData?.status === "APPROVED" ?<><div className=" mx-5 rounded border-0 border-l border-solid border-gray-300"></div>
      <div className=" flex flex-col items-center justify-between  gap-2 p-2">
        <button
          className=" flex-none cursor-pointer rounded border-none bg-blue-700 px-3 py-1"
          onClick={handlePrint}
        >
          Print Driver's QR Code
        </button>
        <div className=" flex items-center justify-center overflow-hidden rounded-lg bg-white">
          <QRCode value={(driverData?.id as string) || ("" as string)} />:<></>
        </div>
      </div></>:(driverData?.status === "PENDING" ?
      <div className=" flex items-center justify-center gap-5 flex-col">
       <div className=" mx-5 rounded border-0 border-l border-solid border-gray-300">Driver's Approval</div>

       <div className=" gap-2 flex items-center flex-col justify-center w-full">
        <Button type="primary" onClick={()=>setApproval({id:driverData.id, status:"APPROVED"})}>Approve</Button>
        <Button  onClick={()=>setApproval({id:driverData.id, status:"DECLINED"})}>Decline</Button>
        </div>
      </div>
       :<></>)}
    </div>
  );
};

export default DriverDetails;
