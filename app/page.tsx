"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

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

          {jobs.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {jobs.map((job) => (
                <li key={job.id} className="p-4 border rounded shadow bg-white">
                  <h3 className="text-xl font-semibold">{job.title} at {job.company}</h3>
                  <p className="text-gray-600">{job.description}</p>
                  <Link href={`/candidate/apply/${job.id}`} className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Apply Now
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No jobs available yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
