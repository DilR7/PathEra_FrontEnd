import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mt-20">{children}</div>
      <Toaster />
      <Footer />
    </>
  );
};

export default MainLayout;
