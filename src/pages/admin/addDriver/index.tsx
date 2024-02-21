import { Form } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { handleUpload } from "~/components/firebase/firebaseupload";
import toast from "react-hot-toast";
import DriverForm from "../../components/DriverForm";
import { Gender } from "@prisma/client";

const VehicleType = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [imageError, setImageError] = useState<boolean>(false);
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
        router.push("/admin/drivers");
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
  }) => {
    if (!imageFile) {
      setImageError(true);
    } else {
      setCreateDriverLoading(true);
      await handleUpload(imageFile).then((imageUrl) => {
        if (!imageUrl) {
          setImageError(true);
          setCreateDriverLoading(false);
        } else {
          createDriver({
            ...e,
            profileUrl: imageUrl,
          });
        }
      });
    }
  };
  const onFinishFailed = () => {
    if (!imageFile) {
      setImageError(true);
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
          submitIsLoading={submitIsLoading}
        />
      </div>
    </div>
  );
};

export default VehicleType;
