
import { ReactNode } from "react";
import SidebarLayout from "./SidebarLayout";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <SidebarLayout>
      <div className={`min-h-[calc(100vh-4rem)] bg-background ${className}`}>
        {children}
      </div>
    </SidebarLayout>
  );
};

export default PageContainer;
