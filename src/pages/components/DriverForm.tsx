import { DatePicker, Form, FormInstance, Image, Input, Select } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import UploadImage from "./uploadImage";
import { IoSend } from "react-icons/io5";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DriverForm = ({
  form,
  onFinish,
  onFinishFailed,
  setImageFile,
  imageFile,
  setImageBase64,
  imageBase64,
  imageError,
  setImageError,
  submitIsLoading,
  isEdit,
  liscenseFile,
  setLicenseFile,
  liscenseBase64,
  setLiscenseBase64,
  liscenseError,
  setLiscenseError,
  isRegistration
}: {
  form:FormInstance<any>;
  onFinish:any;
  onFinishFailed:any;
  setImageFile:any;
  imageFile:any;
  setImageBase64:any;
  imageBase64:any;
  imageError:any;
  setImageError:any;
  submitIsLoading:any;
  isEdit:boolean ;
  liscenseFile:any;
  setLicenseFile:any;
  liscenseBase64:any;
  setLiscenseBase64:any;
  liscenseError:any;
  setLiscenseError:any;
  isRegistration : boolean| undefined
}) => {
  const router = useRouter();
  const { data: vehicleType } = api.vehicleType.getAllvehicleTypes.useQuery({
    searchText: "",
    withOptionFormat: true,
  });
  const handleCancel = () => {
    router.back();
  };
  const vehicleTypeId = Form.useWatch("vehicleTypeId", form)
  const isRequired:any = vehicleType?.find((vt:any)=>vt.value === vehicleTypeId)
  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className=" flex w-full flex-col"
    >
      {
        isRegistration ? <div className=" mb-1 flex w-full flex-row items-center justify-center gap-1 text-center text-xl">
        Driver's Registration
      </div>:(isEdit ? (
          <div className=" mb-1 flex w-full flex-row items-center justify-center gap-1 text-center text-xl">
            Edit Driver's Details
          </div>
        ) : (
          <div className=" mb-1 flex w-full flex-row items-center justify-center gap-1 text-center text-xl">
            <div className=" flex items-center justify-center text-3xl text-blue-700">
              <IoMdAddCircle />
            </div>
            Add New Driver
          </div>
        ))
      }
      <div className=" mb-1  text-xl">Driver's Photo</div>
      <div>{`${isEdit? "Edit ":"Upload "}Drivers's License Photo`}</div>
      <UploadImage
        setImageFile={setImageFile}
        imageFile={imageFile}
        setImageBase64={setImageBase64}
        imageBase64={imageBase64}
        imageError={imageError}
        setImageError={setImageError}
      />
      <div className=" mb-1 mt-3 text-xl">Driver's Name</div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="First Name"
          name={"firstName"}
          className=" flex-1"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input size="large" placeholder="First name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={"lastName"}
          className=" flex-1"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input size="large" placeholder="Last Name" />
        </Form.Item>
      </div>
      <div className=" mb-1 text-xl">Driver's Details</div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Home Address"
          name={"address"}
          className=" flex-1"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input size="large" placeholder="Address" />
        </Form.Item>
      </div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Gender"
          name={"gender"}
          className=" flex-1"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select
            placeholder="Select Gender"
            className=" w-full"
            size="large"
            options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]}
          />
        </Form.Item>
        <Form.Item
          label="Contact No."
          name={"contactNo"}
          className=" flex-1"
          rules={[{ required: true, message: "Contact number is required" }]}
        >
          <Input size="large" placeholder="09*********" />
        </Form.Item>
      </div>
      <div className=" flex w-1/2 flex-row gap-1">
        <Form.Item
          label="Vehicle Type"
          name={"vehicleTypeId"}
          className=" flex-1"
          rules={[{ required: true, message: "Vehicle Type is required" }]}
        >
          <Select
          disabled={isEdit}
            placeholder="Select Vehicle Type"
            className=" w-full"
            size="large"
            options={[...(vehicleType ?? [])]}
          />
        </Form.Item>
      </div>
     {isRequired?.required && <>
     <div className=" mb-5">
      <div>{`${isEdit? "":"Upload "}Drivers's License Photo`}</div>
      {isEdit? 
          <Image src={liscenseBase64} className=" rounded-lg" height={110} alt="Drivers License" /> : <UploadImage
        setImageFile={setLicenseFile}
        imageFile={liscenseFile}
        setImageBase64={setLiscenseBase64}
        imageBase64={liscenseBase64}
        imageError={liscenseError}
        setImageError={setLiscenseError}
      />}</div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Plate No. "
          name={"plateNo"}
          className=" flex-1"
          rules={[{ required: true, message: "Plate number is required" }]}
        >
          <Input size="large" placeholder="Plate No." />
        </Form.Item>
        <Form.Item
          label="License No. "
          name={"licenceNo"}
          className=" flex-1"
          rules={[{ required: true, message: "License number is required" }]}
        >
          <Input size="large" placeholder="License No." />
        </Form.Item>
      </div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="License Expiration Date"
          name={"licenceExpiration"}
          className=" w-1/2"
          rules={[{ required: true, message: "License Expiration Date is required" }]}
        >
          <DatePicker size="large" className=" w-full"/>
        </Form.Item>
      </div>
      <div>Vehicle Details</div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="OR number"
          name={"or"}
          className=" flex-1"
          rules={[{ required: true, message: "OR number is required" }]}
        >
          <Input size="large" placeholder="OR number" />
        </Form.Item>
        <Form.Item
          label="CR number"
          name={"cr"}
          className=" flex-1"
          rules={[{ required: true, message: "CR number is required" }]}
        >
          <Input size="large" placeholder="CR number" />
        </Form.Item>
      </div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Franchise No."
          name={"franchiseNo"}
          className=" flex-1"
        >
          <Input size="large" placeholder="Franchise No" />
        </Form.Item>
      </div>
      </>}
      {isEdit ? (
        <div className=" flex justify-end  gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className=" mb-5 flex cursor-pointer items-center justify-center gap-3 rounded border border-gray-300 bg-white px-8 py-1 text-base text-gray-700 hover:brightness-110"
          >
            Cancel
            {/* <IoSend /> */}
          </button>
          <button
            type="submit"
            disabled={submitIsLoading}
            className=" mb-5 flex w-40 cursor-pointer items-center justify-center gap-3 rounded border border-none border-cyan-600 bg-green-600 px-10 py-1 text-base text-white hover:brightness-110 disabled:opacity-50"
          >
            {submitIsLoading ? "Saving..." : "Save"}
            {/* <IoSend /> */}
          </button>
        </div>
      ) : (
        <button
          type="submit"
          disabled={submitIsLoading}
          className=" mx-auto mb-5 flex h-10 cursor-pointer items-center justify-center gap-3 rounded border border-cyan-600 bg-blue-700 px-10 text-lg text-white hover:brightness-110 disabled:opacity-50"
        >
          {isRegistration ? (submitIsLoading ? "Submitting..." : "Submit Registration"):(submitIsLoading ? "Adding..." : "Add Driver")}
          <IoSend />
        </button>
      )}
    </Form>
  );
};

export default DriverForm;
