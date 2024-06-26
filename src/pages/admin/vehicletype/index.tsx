import { Form, Input, Modal, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { api } from "~/utils/api";

const VehicleType = () => {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [activeVehicleType, setActiveVehicleType] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const { mutate: createVehicleType, isLoading: createIsLoading } =
    api.vehicleType.createVehicleType.useMutation({
      onSuccess: () => {
        form.resetFields();
        setActiveVehicleType(null);
        void refetch();
        toast.success("Vehicle Type added!");
      },
    });
  const { mutate: deleteVehicleType, isLoading: deleteIsLoading } =
    api.vehicleType.deleteVehicleType.useMutation({
      onSuccess: () => {
        form.resetFields();
        setActiveVehicleType(null);
        void refetch();
        toast.success("Vehicle Type deleted!");
      },
    });
  const { mutate: editVehicleType, isLoading: editIsLoading } =
    api.vehicleType.editvehicleType.useMutation({
      onSuccess: () => {
        form2.resetFields();
        void refetch();
        toast.success("Vehicle Type edited!");
        setActiveVehicleType(null);
      },
    });

  const {
    data,
    refetch,
    isLoading: typesIsLoading,
  } = api.vehicleType.getAllvehicleTypes.useQuery({
    searchText,
  });

  const onFinish = (e: { vehicleType: string, required: boolean }) => {
    createVehicleType({
      ...e,
    });
  };

  useEffect(()=>{
    form.setFieldValue("required",true)
  },[form,activeVehicleType])

  const onFinishEdit = (e: { vehicleType: string }) => {
    editVehicleType({
      ...e,
      id: activeVehicleType.data.id,
    });
  };

  const onCloseModal = () => {
    setActiveVehicleType(null);
  };

  const openModal = (type: string, data: any) => {
    setActiveVehicleType({
      type,
      data,
    });
  };

  const onDeleteVehicleType = () => {
    deleteVehicleType({
      id: activeVehicleType.data.id,
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
    },
    {
      title: "Count of Registered Drivers",
      dataIndex: "Driver",
      render: (data) => (
        <>
          {data.length ? (
            `${data.length} Registered Drivers`
          ) : (
            <div className=" text-gray-400">No Registered Driver</div>
          )}
        </>
      ),
    },
    {
      title: "Registration",
      dataIndex: "driverPapersRequired",
      render: (data) => (
        <>
          {data ? <div className=" text-blue-700">Required</div>:<div className=" text-gray-600">Not Required</div>
    }
        </>
      ),
    },
    {
      title: "Action",
      align: "center",
      width: 200,
      render: (data: any) => (
        <div className=" flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => openModal("edit", data)}
            className="flex flex-1 cursor-pointer items-center   justify-center gap-1 rounded border-none bg-orange-400 py-1 text-white"
          >
            <FaEdit />
            Edit
          </button>
          <button
            disabled={data?.Driver?.length}
            onClick={() => openModal("delete", data)}
            className=" flex flex-1 cursor-pointer  items-center justify-center gap-1 rounded border-none bg-red-500 py-1 text-white disabled:bg-slate-400"
          >
            <div className=" flex items-center justify-center text-base">
              <MdDeleteForever />
            </div>
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (activeVehicleType?.data) {
      const data = activeVehicleType.data;
      console.log(data.driverPapersRequired)
      form2.setFieldsValue({
        vehicleType: data.vehicleType,
        required: true
      });
    }
  }, [activeVehicleType]);

  return (
    <div className=" flex w-full flex-row justify-center gap-5 p-5 pt-0">
      <Modal
        title={
          <div className=" flex flex-row gap-1">
            <div className=" flex items-center justify-start text-xl text-blue-600">
              <IoMdAddCircle />
            </div>
            Add Vehicle Type
          </div>
        }
        open={activeVehicleType?.type === "add"}
        onCancel={onCloseModal}
        width={350}
        footer={[]}
      >
        <div className=" flex  flex-col ">
          <div className=" flex-col rounded bg-white p-3">
            <Form
              form={form}
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              className=" flex w-full flex-col"
            >
            <div className=" mb-2 mt-2 text-sm text-gray-500">
              Vehicle Type
            </div>
            <Form.Item
              name={"vehicleType"}
              rules={[
                { required: true, message: "Vehicle type is required" },
              ]}
            >
              <Input placeholder="Input Vehicle Type" />
            </Form.Item>
              <div className=" mb-2 mt-2 text-sm text-gray-500">
                Driver's License and Registration Papers Required
              </div>
              <Form.Item
                name={"required"}
              >
                <Switch defaultChecked={form.getFieldValue("required")} />
              </Form.Item>
            <button
              type="submit"
              disabled={createIsLoading}
              className=" w-full cursor-pointer rounded border border-none border-cyan-600 bg-blue-600 p-2 text-white hover:brightness-110"
            >
              {createIsLoading ? "Adding ..." : "Add Type"}
            </button>
            </Form>
          </div>
        </div>
      </Modal>
      <div className=" flex flex-1 flex-col">
        <div className=" min-h-96 flex flex-col rounded  bg-white">
          <div className=" flex w-full items-center justify-between">
            <div className=" w-1/3 p-5 px-2">
              <div className=" flex flex-1 flex-col gap-1">
                <div>Search Vehicle Type</div>
                <Search
                  width={10}
                  className=" flex-none"
                  placeholder="Vehicle Type"
                  size="large"
                  onSearch={(e) => setSearchText(e)}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearchText("");
                    }
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => openModal("add", data)}
              className="flex cursor-pointer items-center gap-2  rounded border-none bg-blue-600 px-5 py-1 text-base text-white hover:brightness-110"
            >
              <div className=" flex items-center justify-start text-xl text-white">
                <IoMdAddCircle />
              </div>
              Add Vehicle Type
            </button>
          </div>
          <Table
            // rowSelection={rowSelection}
            pagination={{ pageSize: 8 }}
            columns={columns}
            dataSource={data}
            loading={typesIsLoading}
          />
          <Modal
            title={
              <div className=" flex flex-row">
                <div className=" flex items-center justify-start text-xl text-red-600">
                  <MdDeleteForever />
                </div>
                Delete
              </div>
            }
            open={activeVehicleType?.type === "delete"}
            onCancel={onCloseModal}
            width={350}
            footer={[]}
          >
            {activeVehicleType?.data && (
              <div>
                {activeVehicleType?.data?.Driver?.length ? (
                  <div className=" flex flex-col">
                    <div>
                      You can't delete Vehicle Types that already has Registered
                      Drivers
                    </div>
                    <div className=" mt-3 flex flex-row gap-2">
                      <button
                        onClick={onCloseModal}
                        className=" flex-1  cursor-pointer rounded border bg-white py-1 text-gray-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-col">
                    <div>
                      Are you sure you want to delete this vehicle type?
                    </div>
                    <div className=" mt-3 flex flex-row gap-2">
                      <button
                        onClick={onDeleteVehicleType}
                        className=" flex-1  cursor-pointer rounded border-none bg-red-500 py-1 text-white"
                      >
                        Delete
                      </button>
                      <button
                        onClick={onCloseModal}
                        className="  flex-1 cursor-pointer rounded border  bg-white py-1 text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>
          <Modal
            title={
              <div className=" flex flex-row gap-1">
                <div className=" flex items-center justify-start text-lg text-orange-500">
                  <FaEdit />
                </div>
                Edit
              </div>
            }
            open={activeVehicleType?.type === "edit"}
            onCancel={onCloseModal}
            width={350}
            footer={[]}
          >
            {activeVehicleType?.data && (
              <div>
                <Form
                  form={form2}
                  name="basic"
                  onFinish={onFinishEdit}
                  autoComplete="off"
                  className=" flex w-full flex-col"
                >
                  <div className=" mb-2 mt-2 text-sm text-gray-500">
                    Vehicle Type
                  </div>
                  <Form.Item
                    name={"vehicleType"}
                    rules={[
                      { required: true, message: "Vehicle type is blank" },
                    ]}
                  >
                    <Input placeholder="Input Vehicle Type" />
                  </Form.Item>
                  <div className=" mb-2 mt-2 text-sm text-gray-500">
                    Driver's License and Registration Papers Required (Cannot Edit this field)
                  </div>
                  <Form.Item
                    name={"required"}
                  >
                    <Switch checked={activeVehicleType.data.driverPapersRequired} disabled/>
                  </Form.Item>

                  <button
                    type="submit"
                    disabled={createIsLoading}
                    className=" w-full cursor-pointer rounded border border-none border-cyan-600 bg-blue-600 p-2 text-white hover:brightness-110"
                  >
                    {createIsLoading ? "Submitting ..." : "Submit"}
                  </button>
                </Form>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default VehicleType;
