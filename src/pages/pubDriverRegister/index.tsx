import { Form, Modal } from "antd";
import { useState } from "react";
import { api } from "~/utils/api";
import { handleUpload } from "~/components/firebase/firebaseupload";
import toast from "react-hot-toast";
import DriverForm from "../components/DriverForm";
import { type Gender } from "@prisma/client";
import dayjs from "dayjs";

const DriverRegistration = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [liscenseFile, setLicenseFile] = useState<any>(null);
  const [liscenseBase64, setLiscenseBase64] = useState<any>(null);
  const [liscenseError, setLiscenseError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createDriverLoading, setCreateDriverLoading] =
    useState<boolean>(false);

  const { mutate: createDriver, isLoading: createIsLoading } =
    api.driver.createDriver.useMutation({
      onSuccess: (data:any) => {
        if(data.error){
          form.setFields([
          {
            name: 'contactNo',
            errors: [data.message],
          },
       ]);
       setCreateDriverLoading(false);
        }else{
          setImageBase64(null);
          setImageFile(null);
          setCreateDriverLoading(false);
          form.resetFields();
          setIsModalOpen(true)
          toast.success("Registration submitted!");
        }
      },
    });

  const submitIsLoading = createDriverLoading || createIsLoading;

  const onFinish = async (e: {
    firstName: string;
    lastName: string;
    address: string;
    contactNo: string;
    plateNo: string;
    vehicleTypeId: number;
    licenceNo: string;
    gender: Gender;
    licenceExpiration: any;
  }) => {
    if (!imageFile || (e.licenceNo && !liscenseFile)) {
      setImageError(!imageFile);
      setLiscenseError(!!!liscenseFile);
    } else {
      console.log({...e}, dayjs(e.licenceExpiration).toDate())
      setCreateDriverLoading(true);
      const imageUrl = await handleUpload(imageFile)
      if(e.plateNo){
        const licenseUrl = await handleUpload(liscenseFile)
        if (imageUrl && licenseUrl) {
          createDriver({
            ...e,
            profileUrl: imageUrl,
            licencePhotoUrl: licenseUrl,
            licenceExpiration:dayjs(e.licenceExpiration).toDate()
          });
        } else if(!imageUrl) {
          setImageError(true);
          setCreateDriverLoading(false);
        }else if(!licenseUrl){
          setLiscenseError(true);
          setCreateDriverLoading(false);
        }
      }else {
        
        if (imageUrl) {
          createDriver({
            ...e,
            profileUrl: imageUrl,
          });
        } else {
          setImageError(true);
          setCreateDriverLoading(false);
        }
      }
    }
  };
  const onFinishFailed = () => {
    if (!imageFile || !liscenseFile) {
      setImageError(!imageFile);
      setLiscenseError(!liscenseFile);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className=" z-20 flex min-h-screen flex-col items-center justify-center rounded bg-gradient-to-t from-blue-600 to-cyan-400 p-5">
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
      <div className=" lg:w-1/2 rounded-xl bg-slate-50 p-5 shadow-md">
        <Modal title="Registration Submitted" open={isModalOpen} footer={[]} onCancel={handleCancel}>
        <div>Your registraion is now submitted.</div>
        <div>Go to the admin office to get your printed QR Code.</div>
      </Modal>
        {" "}
        <DriverForm
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          setImageFile={setImageFile}
          imageFile={imageFile}
          setImageBase64={setImageBase64}
          imageBase64={imageBase64}
          imageError={imageError}
          setImageError={setImageError}
          liscenseFile={liscenseFile} 
          setLicenseFile={setLicenseFile}
          liscenseBase64={liscenseBase64}
          setLiscenseBase64={setLiscenseBase64}
          liscenseError={liscenseError}
          setLiscenseError={setLiscenseError}
          submitIsLoading={submitIsLoading}
          isEdit={false}
          isRegistration={true}
        />
      </div>
    </div>
    </div>
  );
};

export default DriverRegistration;
