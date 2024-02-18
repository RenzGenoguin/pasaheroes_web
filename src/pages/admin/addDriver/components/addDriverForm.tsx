import { Form, Input, Select } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import UploadImage from "./uploadImage";
import { IoSend } from "react-icons/io5";
import { api } from "~/utils/api";

const AddDriverForm = ({
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
}: any) => {
  const { data: vehicleType } = api.vehicleType.getAllvehicleTypes.useQuery({
    searchText: "",
    withOptionFormat: true,
  });
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
      <div className=" mb-4 flex w-full flex-row items-center justify-center gap-1 text-center text-xl">
        <div className=" flex items-center justify-center text-3xl text-blue-700">
          <IoMdAddCircle />
        </div>
        Add New Driver
      </div>
      <div className=" mb-2  text-xl">Driver's Photo</div>
      <div>Upload Drivers's Image</div>
      <UploadImage
        setImageFile={setImageFile}
        imageFile={imageFile}
        setImageBase64={setImageBase64}
        imageBase64={imageBase64}
        imageError={imageError}
        setImageError={setImageError}
      />
      <div className=" mb-2 mt-5 text-xl">Driver's Name</div>
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
      <div className=" mb-2 text-xl">Driver's Details</div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Vehicle Type"
          name={"vehicleTypeId"}
          className=" flex-1"
          rules={[{ required: true, message: "Vehicle Type is required" }]}
        >
          <Select
            placeholder="Select Vehicle Type"
            className=" w-full"
            size="large"
            options={[...(vehicleType || [])]}
          />
        </Form.Item>
        <Form.Item
          label="Plate No. "
          name={"plateNo"}
          className=" flex-1"
          rules={[{ required: true, message: "Plate number is required" }]}
        >
          <Input size="large" placeholder="Plate No." />
        </Form.Item>
      </div>
      <div className=" flex w-full flex-row gap-1">
        <Form.Item
          label="Home Address"
          name={"address"}
          className=" flex-1"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input size="large" placeholder="Address" />
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
      <button
        type="submit"
        disabled={submitIsLoading()}
        className=" mx-auto mb-10 flex h-10 cursor-pointer items-center justify-center gap-3 rounded border border-cyan-600 bg-blue-700 px-10 text-lg text-white hover:brightness-110"
      >
        {submitIsLoading() ? "Adding ..." : "Add Driver"}
        <IoSend />
      </button>
    </Form>
  );
};

export default AddDriverForm;
