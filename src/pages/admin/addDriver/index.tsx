import { Form } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { handleUpload } from "~/components/firebase/firebaseupload";
import toast from "react-hot-toast";
import DriverForm from "../../components/DriverForm";
import { type Gender } from "@prisma/client";
import dayjs from "dayjs";

const VehicleType = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [liscenseFile, setLicenseFile] = useState<any>(null);
  const [liscenseBase64, setLiscenseBase64] = useState<any>(null);
  const [liscenseError, setLiscenseError] = useState<boolean>(false);
  const [createDriverLoading, setCreateDriverLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const { mutate: createDriver, isLoading: createIsLoading } =
    api.driver.createDriver.useMutation({
      onSuccess: () => {
        form.resetFields();
        setImageBase64(null);
        setImageFile(null);
        setCreateDriverLoading(false);
        form.resetFields();
        toast.success("Driver Added!");
        void router.push("/admin/drivers");
      },
    });

  const submitIsLoading = () => {
    return createDriverLoading || createIsLoading;
  };

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

  return (
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
      <div className=" w-1/2 rounded-xl bg-slate-50 p-5 shadow-md">
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
        />
      </div>
    </div>
  );
};

export default VehicleType;
