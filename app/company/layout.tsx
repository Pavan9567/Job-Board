// app/company/layout.tsx
import { ReactNode } from 'react';
import Navbar from '../../components/Navbar';

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar userType="company" />
      <main>{children}</main>
    </>
  );
}
