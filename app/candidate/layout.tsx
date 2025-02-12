// app/candidate/layout.tsx
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar userType="candidate" />
      <main>{children}</main>
    </>
  );
}