import Link from 'next/link';
import { getJobs } from '../../../lib/db';

export default async function CompanyJobsPage() {
  const jobs = await getJobs();

  if (!Array.isArray(jobs)) {
    return <p className='p-6 text-red-500'>Error: Jobs data is not available.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Posted Jobs</h1>
      <Link href="/company/jobs/create" className="bg-green-500 text-white p-2 rounded mb-4 block">
        + Post New Job
      </Link>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded mb-2">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <Link href={`/company/jobs/${job.id}/edit`}><button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button></Link><br/>
            <Link href={`/company/jobs/${job.id}/applications`} className="text-blue-500">
              View Applications
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
