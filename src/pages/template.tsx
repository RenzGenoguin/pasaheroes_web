import { Layout } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import MenuSider from "./components/MenuSider";

const siderItems = [
  {
    icon: <RiDashboardFill />,
    title: "Dashboard",
    url: "/admin",
    key: "dashboard",
  },
  {
    icon: <ImUsers />,
    title: "Drivers",
    url: "/admin/drivers",
    key: "drivers",
  },
  {
    icon: <HiUserGroup />,
    title: "Pasahero",
    url: "/admin/pasahero",
    key: "pasahero",
  },
  {
    icon: <FaCar />,
    title: "Vehicle Types",
    url: "/admin/vehicletype",
    key: "vehicletype",
  },
];

const AdditionalPages = [
  {
    icon: <ImUsers />,
    title: "Add New Driver",
    url: "/admin/addDriver",
  },
  {
    icon: <ImUsers />,
    title: "Driver Details",
    url: "/admin/driverDetails",
  },
  {
    icon: <ImUsers />,
    title: "Edit Driver's Details",
    url: "/admin/editDriver",
  },
];
const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { Content } = Layout;
  const pathname = usePathname();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/login");
    } else {
      if (pathname?.includes("login")) {
        router.push("/admin");
      }
    }
  }, []);

  const findRouteName = () => {
    let active: any = siderItems[0];
    if (pathname !== "/admin") {
      active = [...siderItems, ...AdditionalPages].find((data) => {
        if (data.url !== "/admin") {
          return pathname?.includes(data.url);
        }
      });
    }
    if (active) {
      return (
        <div className=" flex flex-row items-center gap-2">
          <div className=" ml-3 flex items-center justify-center text-2xl">
            {active.icon}
          </div>
          {`${active.title}`}
        </div>
      );
    }
  };

  if (pathname !== "/login") {
    return (
      <div className=" min-h-screen">
        <Layout className=" min-h-screen">
          <div className="flex min-h-screen flex-row">
            <MenuSider siderItems={siderItems} siderTitle={"PASAHEROES"} />
            <Content className=" flex w-full flex-col bg-white">
              <div className=" my-3 flex  text-white">
                <div className=" w-72 rounded-r-full bg-gradient-to-r from-blue-800 to-blue-600 py-4 pl-3 text-lg font-medium ">
                  {findRouteName()}
                </div>
              </div>
              {children}
            </Content>
          </div>
        </Layout>
      </div>
    );
  }
  return <div className=" font-sans">{children}</div>;
};

export default RootTemplate;
