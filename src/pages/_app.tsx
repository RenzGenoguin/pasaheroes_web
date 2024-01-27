import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import RootTemplate from "./template";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RootTemplate>
      <Toaster />
      <Component {...pageProps} />
    </RootTemplate>
  );
};

export default api.withTRPC(MyApp);
