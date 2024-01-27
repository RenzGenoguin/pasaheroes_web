import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/login");
    } else {
      router.push("/admin");
    }
  }, []);
  return <div>{children}</div>;
};

export default RootTemplate;
