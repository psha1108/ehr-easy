
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80">
      <div className="absolute inset-0 bg-grid-medical-100/30 bg-fixed pointer-events-none" />
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
