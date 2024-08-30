import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
