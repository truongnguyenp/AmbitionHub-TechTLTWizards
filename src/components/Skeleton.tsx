import { FC, ReactNode } from "react";

interface SkeletonWrapperProps {
  children?: ReactNode;
}

interface SkeletonProps {
  className: string;
  children?: ReactNode;
}

const SkeletonWrapper: FC<SkeletonWrapperProps> = ({ children }) => {
  return (
    <div role="status" className=" animate-pulse">
      {children}
    </div>
  );
};

export default SkeletonWrapper;

export const Skeleton: FC<SkeletonProps> = ({ className, children }) => {
  return (
    <div className={`bg-gray-300 opacity-80 ${className}`}>{children}</div>
  );
};
