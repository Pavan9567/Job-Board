import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">Job Board</Link>
          <div className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link href="/company/jobs" className="text-gray-700 hover:text-blue-500">Company</Link>
            <Link href="/candidate/jobs" className="text-gray-700 hover:text-blue-500">Candidate</Link>
          </div>
        </div>
      </nav>
      <header className="text-center py-16 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-lg">Browse job listings or post new job openings.</p>
      </header>
      <div className="container mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">For Companies</h2>
          <p className="text-gray-600">Post and manage job listings effortlessly.</p>
          <Link href="/company/jobs" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Go to Company Dashboard
          </Link>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">For Candidates</h2>
          <p className="text-gray-600">Browse job listings and apply easily.</p>
          <Link href="/candidate/jobs" className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Available Jobs
          </Link>
        </section>
      </div>
    </div>
  );
}
