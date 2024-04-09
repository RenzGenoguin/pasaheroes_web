import { Divider, Modal, Rate } from "antd";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineDownloading } from "react-icons/md";
import RideMap from "~/pages/components/RideMap";

const RideDetailsModal = ({ detailsModal, setDetailsModal }: any) => {
  const handleCancel = () => {
    setDetailsModal(null);
  };
  return (
    <Modal
      open={!!detailsModal}
      onCancel={handleCancel}
      footer={[]}
      width={900}
    >
      {detailsModal ? (
       <div>
       <div className=" flex w-full items-center justify-center">
         {detailsModal.endRide ? (
           <div className=" flex flex-row items-center gap-1 pr-3 text-base text-green-500">
             <FaRegCheckCircle />
             Done
           </div>
         ) : (
           <div className=" flex flex-row items-center gap-1 pr-3 text-base text-orange-500">
             <MdOutlineDownloading />
             Riding
           </div>
         )}
       </div>
         <div className=" flex flex-row gap-10 justify-center items-center">
          <div className=" flex flex-col flex-1">
            <div className=" -mb-1 text-gray-400">Driver</div>
            <div className=" ml-1 flex flex-col">
              <div className=" text-xl font-medium text-gray-800">{`${detailsModal.Driver.firstName} ${detailsModal.Driver.lastName}`}</div>
              <div className="  text-gray-500">
                Vehicle Type :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Driver.vehicleType.vehicleType}
                </span>
              </div>
              <div className="  text-gray-500">
                Plate No :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Driver.plateNo}
                </span>
              </div>
              <div className="  text-gray-500">
                License No :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Driver.licenceNo}
                </span>
              </div>
              <div className="  text-gray-500">
                Contact No :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Driver.contactNo || "No Contact Provided"}
                </span>
              </div>
              <div className="  text-gray-500">
                Address :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Driver.address}
                </span>
              </div>
            </div>
            <Divider className=" m-1 mt-2 p-1" />
            <div className=" -mb-1 text-gray-400">Pasahero</div>
            <div className=" ml-1 flex flex-col">
              <div className=" text-xl font-medium text-gray-800">{`${detailsModal.Pasahero.firstName} ${detailsModal.Pasahero.lastName}`}</div>
              <div className="  text-gray-500">
                Contact No :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Pasahero.contactNo || "No Contact Provided"}
                </span>
              </div>
              <div className="  text-gray-500">
                Emergency Contact No :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Pasahero.emergencyContact}
                </span>
              </div>
              <div className="  text-gray-500">
                Address :{" "}
                <span className=" font-medium text-gray-900">
                  {detailsModal.Pasahero.address}
                </span>
              </div>
            </div>
            <Divider className=" m-1 mt-2 p-1" />
            <div className=" text-gray-400">Trip Details</div>
            <div className=" ml-1 flex flex-col">
              <div className="  text-gray-500">
                Starts :{" "}
                <span className=" font-medium text-gray-900">
                  {dayjs(detailsModal.startRide).format("MMM D, YYYY h:mm A")}
                </span>
              </div>
              {detailsModal.endRide ? (
                <div className="flex flex-col">
                  <div className="  text-gray-500">
                    Ends :{" "}
                    <span className=" font-medium text-gray-900">
                      {dayjs(detailsModal.endRide).format("MMM D, YYYY h:mm A")}
                    </span>
                  </div>
                  <div className=" relative  flex items-center gap-1 text-gray-500">
                    Pasahero's Rating :
                    {detailsModal.Rating ? (
                      <div className=" absolute left-36 mt-1 flex items-center justify-center gap-1">
                        <Rate
                          allowHalf
                          character={<FaStar size={18} />}
                          disabled
                          value={parseFloat(
                            detailsModal.Rating.rating.toFixed(1),
                          )}
                        />
                        <span className=" mb-1">
                          ({parseFloat(detailsModal.Rating.rating.toFixed(1))})
                        </span>
                      </div>
                    ) : (
                      <span className=" text-xs text-gray-400">
                        {" No Rating"}
                      </span>
                    )}
                  </div>
                  <div className="  text-gray-500">
                    Pasahero's Comment :{" "}
                    {detailsModal.Comment ? (
                      <div className=" rounded-md  p-1 py-0 font-medium text-gray-700">
                        <div className=" rounded bg-blue-50 p-2 py-1 font-normal">
                          {detailsModal.Comment.comment}
                        </div>
                      </div>
                    ) : (
                      <span className=" text-xs text-gray-400">
                        {" No Comment"}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        <div className=" flex-1">
          <RideMap start={[ detailsModal.startLat, detailsModal.startLong]} end={[detailsModal.endLat, detailsModal.endLong]}/>
        </div>
        </div>
       </div>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default RideDetailsModal;
