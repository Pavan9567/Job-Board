// app/candidate/jobs/page.tsx
import JobCard from '@/components/JobCard';
import { getJobs } from '../../../lib/db';

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
    </div>
  );
}