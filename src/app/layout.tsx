import Footer from "@/common/layouts/Footer";
import Navbar from "@/common/layouts/Navbar";
import "./globals.css";
import {ReactQueryProvider} from "@/api/client/reactQuery";
import {CustomToaster} from "@/ui/CustomToaster";

export const metadata = {
  title: "Pet Page",
  // icons: {
  //   icon: "/favicon.png",
  // },
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className="relative ">
        <ReactQueryProvider>
          <Navbar />
          <CustomToaster />
          <main>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
