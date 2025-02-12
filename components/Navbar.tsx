import Link from 'next/link';

interface NavbarProps {
  userType: 'candidate' | 'company';
}

export default function Navbar({ userType }: NavbarProps) {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        {userType === 'candidate' ? (
          <li><Link href="/candidate/jobs">Browse Jobs</Link></li>
        ) : (
          <li><Link href="/company/jobs">View Posted Jobs</Link></li>
        )}
      </ul>
    </nav>
  );
}
