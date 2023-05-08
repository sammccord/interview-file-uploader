import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import { UserProvider } from "../components/UserContext";
import "../styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default MyApp;
