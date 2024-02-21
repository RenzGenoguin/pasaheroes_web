import { Divider, Modal, Rate } from "antd";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineDownloading } from "react-icons/md";

const RideModal = ({ ridesModal, setRidesModal }: any) => {
  const handleCancel = () => {
    setRidesModal(null);
  };
  return (
    <Modal open={!!ridesModal} onCancel={handleCancel} footer={[]} width={400}>
      {ridesModal ? (
        <div className=" flex flex-col">
          <div className=" flex w-full items-center justify-center">
            {ridesModal.endRide ? (
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
          <div className=" -mb-1 text-gray-400">Pasahero</div>
          <div className=" ml-1 flex flex-col">
            <div className=" text-xl font-medium text-gray-800">{`${ridesModal.Pasahero.firstName} ${ridesModal.Pasahero.lastName}`}</div>
            <div className="  text-gray-500">
              Contact No :{" "}
              <span className=" font-medium text-gray-900">
                {ridesModal.Pasahero.contactNo || "No Contact Provided"}
              </span>
            </div>
            <div className="  text-gray-500">
              Emergency Contact No :{" "}
              <span className=" font-medium text-gray-900">
                {ridesModal.Pasahero.emergencyContact}
              </span>
            </div>
            <div className="  text-gray-500">
              Address :{" "}
              <span className=" font-medium text-gray-900">
                {ridesModal.Pasahero.address}
              </span>
            </div>
          </div>
          <Divider className=" m-1 mt-2 p-1" />
          <div className=" text-gray-400">Trip Details</div>
          <div className=" ml-1 flex flex-col">
            <div className="  text-gray-500">
              Starts :{" "}
              <span className=" font-medium text-gray-900">
                {dayjs(ridesModal.startRide).format("MMM D, YYYY h:mm A")}
              </span>
            </div>
            {ridesModal.endRide ? (
              <div className="flex flex-col">
                <div className="  text-gray-500">
                  Ends :{" "}
                  <span className=" font-medium text-gray-900">
                    {dayjs(ridesModal.endRide).format("MMM D, YYYY h:mm A")}
                  </span>
                </div>
                <div className=" relative  flex items-center gap-1 text-gray-500">
                  Rating :
                  {ridesModal.Rating ? (
                    <div className=" absolute left-14 mt-1 flex items-center justify-center gap-1">
                      <Rate
                        allowHalf
                        character={<FaStar size={18} />}
                        disabled
                        value={parseFloat(ridesModal.Rating.rating.toFixed(1))}
                      />
                      <span className=" mb-1">
                        ({parseFloat(ridesModal.Rating.rating.toFixed(1))})
                      </span>
                    </div>
                  ) : (
                    <span className=" text-xs text-gray-400">
                      {" No Rating"}
                    </span>
                  )}
                </div>
                <div className="  text-gray-500">
                  Comment :{" "}
                  {ridesModal.Comment ? (
                    <div className=" rounded-md  p-1 py-0 font-medium text-gray-700">
                      <div className=" rounded bg-blue-50 p-2 py-1 font-normal">
                        {ridesModal.Comment.comment}
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
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default RideModal;
