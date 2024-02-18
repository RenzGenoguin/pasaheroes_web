import { Dropdown, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCog } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className=" flex items-center gap-2 text-red-600">
        <FaPowerOff />
        Logout
      </div>
    ),
  },
];
const MenuSider = ({ siderTitle, siderItems }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const changePage = (url: string) => {
    return () => router.push(url);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={logout} className=" flex items-center gap-2 text-red-600">
          <FaPowerOff />
          Logout
        </div>
      ),
    },
  ];
  return (
    <div className=" flex w-72 flex-col items-center justify-between bg-gradient-to-b from-blue-800 to-cyan-400 p-5 pb-10">
      <div className=" w-full">
        <div className=" w-full text-center text-2xl font-bold uppercase text-white">
          {siderTitle}
        </div>
        <div className=" flex w-full flex-col items-center gap-3 py-5">
          {siderItems.map((menu: any, index: number) => {
            return (
              <div
                key={index}
                onClick={changePage(menu.url)}
                className={` item-center flex w-full cursor-pointer flex-row gap-2 rounded-lg p-1 px-4 pt-2  ${
                  pathname === menu.url
                    ? "bg-white bg-opacity-90 text-blue-800"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <div className="text-xl ">{menu.icon}</div>
                <div className=" text-base font-medium ">{menu.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Dropdown menu={{ items }} placement="topLeft" trigger={["click"]}>
        <div className=" flex w-full cursor-pointer items-center px-2 hover:brightness-110">
          <div className=" z-10 flex flex-none items-center justify-center rounded-full bg-blue-800 p-3 text-2xl text-white">
            <FaUserCog className=" -mr-0.5 ml-0.5" />
          </div>
          <div className=" -ml-10 w-40 rounded-full bg-blue-700 bg-opacity-70 p-2 pl-12 text-base text-white">
            Admin
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default MenuSider;
