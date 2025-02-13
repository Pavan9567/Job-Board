import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JobCard({ job }: { job: any }) {
  return (
    <div className="p-4 border rounded mb-2">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.description}</p>
      <p className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"><Link href={`/candidate/apply/${job.id}`}>Apply</Link></p>
    </div>
  );
}
