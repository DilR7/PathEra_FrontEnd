import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

type MainLayoutProps = PropsWithChildren & {
  overflowHidden?: boolean;
};

const MainLayout = ({ children, overflowHidden = false }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div
        className={`mt-20 ${
          overflowHidden ? "overflow-x-hidden" : ""
        }`}
      >
        {children}
      </div>
      <Toaster />
      <Footer />
    </>
  );
};

export default MainLayout;
