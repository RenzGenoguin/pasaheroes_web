import { Form } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { handleUpload } from "~/components/firebase/firebaseupload";
import toast from "react-hot-toast";
import DriverForm from "~/pages/components/DriverForm";
import { Gender } from "@prisma/client";
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

  const { data: driverData, isLoading: driverDetailsIsLoading } =
    api.driver.getDriver.useQuery(
      {
        id: router.query.id as string,
      },
      {
        enabled: !!router.query.id,
      },
    );

  const { mutate: editDriver, isLoading: createIsLoading } =
    api.driver.editDriver.useMutation({
      onSuccess: () => {
        // setImageBase64(null);
        // setImageFile(null);
        // setCreateDriverLoading(false);
        // form.resetFields();
        toast.success("Driver's Detail Updated!");
        router.back();
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
    if (driverData) {
      if (!imageFile && !imageBase64) {
        setImageError(true);
      } else if (!imageFile && imageBase64) {
        editDriver({
          ...e,
          licenceExpiration:dayjs(e.licenceExpiration).toDate(),
          profileUrl: driverData.profileUrl!,
          id: router.query.id as string,
        });
      } else {
        setCreateDriverLoading(true);
        await handleUpload(imageFile).then((imageUrl) => {
          if (!imageUrl) {
            setImageError(true);
            setCreateDriverLoading(false);
          } else {
            editDriver({
              ...e,
              profileUrl: imageUrl,
              id: router.query.id as string,
            });
          }
        });
      }
    }
  };
  const onFinishFailed = () => {
    if (!imageFile) {
      setImageError(true);
    }
  };

  if (driverDetailsIsLoading || !router.query.id) {
    return (
      <div className=" flex h-full w-full items-center justify-center">
        Loading ...
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (driverData) {
      const {
        firstName,
        lastName,
        address,
        contactNo,
        plateNo,
        vehicleTypeId,
        gender,
        licenceNo,
        registration,licenceExpiration
      } = driverData;
      if (!imageFile) {
        setImageBase64(driverData.profileUrl);
      } 
      if(!liscenseFile && driverData.licencePhotoUrl){
        setLiscenseBase64(driverData.licencePhotoUrl)
      }
      form.setFieldsValue({
        firstName,
        lastName,
        address,
        contactNo,
        vehicleTypeId,
        gender,
        licenceNo:licenceNo,
        plateNo:plateNo,
        or:registration?.or ?? null,
        cr:registration?.cr ?? null,
        franchiseNo:registration?.franchiseNo ?? null,
        licenceExpiration:dayjs(licenceExpiration)
      });
    }
  }, [driverData]);

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
          isEdit={true}
          isRegistration={undefined}
        />
      </div>
    </div>
  );
};

export default VehicleType;
