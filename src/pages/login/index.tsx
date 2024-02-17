import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, Input, Layout } from "antd";
import { MdEmail } from "react-icons/md";
import { IoIosUnlock } from "react-icons/io";

const LoginPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const loginLocalStorage = (user: string, id: number, type: string) => {
    localStorage.setItem("userType", user),
      localStorage.setItem("userId", id.toString());
    localStorage.setItem("adminType", type);
  };
  const { mutate, isLoading } = api.login.login.useMutation({
    onSuccess: (data) => {
      if (data.userId === "error") {
        localStorage.clear();
        toast.error("User not found");
        form.setFields([
          {
            name: "username",
            errors: [""],
          },
          {
            name: "password",
            errors: [""],
          },
        ]);
      } else if (data.userType === "admin") {
        router.refresh();
        toast.success("Logged in as admin");
        loginLocalStorage(data.userType, data.userId, data.adminType);
      }
    },
  });
  const onLogin = (e: any) => {
    const { username, password } = e;
    mutate({
      username: username,
      password: password,
    });
  };
  return (
    <div className=" z-20 flex min-h-screen flex-col items-center justify-center rounded bg-gradient-to-t from-blue-600 to-cyan-400 p-5">
      <div className=" flex w-96 flex-col items-center justify-center gap-6 rounded-2xl bg-white p-10 py-16 shadow-2xl">
        <div className=" text-5xl  font-bold uppercase text-sky-700">
          PASAHEROES
        </div>
        <Form
          form={form}
          name="basic"
          onFinish={onLogin}
          autoComplete="off"
          className=" flex w-80 flex-col"
        >
          <Form.Item
            name={"username"}
            rules={[{ required: true, message: "Username is required" }]}
            className=""
          >
            <Input
              className=" w-full rounded-full border border-blue-100 p-3 px-5 shadow-md shadow-blue-300"
              size="large"
              placeholder="Username"
              prefix={<MdEmail className=" pr-3 text-3xl text-blue-500" />}
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              className=" rounded-full border border-blue-100 p-3 px-5 pr-7 shadow-md shadow-blue-300"
              size="large"
              placeholder="Password"
              prefix={<IoIosUnlock className=" pr-2 text-4xl text-blue-500" />}
            />
          </Form.Item>
          <button
            type="submit"
            className=" mt-5 cursor-pointer rounded-full border-none bg-gradient-to-r from-blue-600 to-cyan-400 p-3 text-base uppercase shadow-lg hover:brightness-105"
          >
            {isLoading ? "Logging in ..." : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
