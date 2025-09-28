import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
