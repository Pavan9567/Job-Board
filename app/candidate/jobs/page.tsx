import JobCard from '@/components/JobCard';
import { getJobs } from '../../../lib/db';
import Link from 'next/link';

export default async function CandidateJobsPage() {
  const jobs = await getJobs();
  
  if (!Array.isArray(jobs)) {
    return <p className='p-6 text-red-500'>Error: Jobs data is not available.</p>
  }

  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Available Jobs</h1>
        {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
            <p>No jobs available</p>
        )}
      <Link href="/candidate/apply" className='mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Apply to a Job</Link>
    </div>
  );
}