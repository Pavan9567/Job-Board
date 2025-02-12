'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface JobFormProps {
  initialData?: { title: string; company: string; description: string };
  jobId?: string;
}

export default function JobForm({ initialData, jobId }: JobFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    description: initialData?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = jobId ? `/api/jobs/${jobId}` : '/api/jobs';
    const method = jobId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push('/company/jobs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold">{jobId ? 'Edit Job' : 'Create Job'}</h1>
      <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {jobId ? 'Update Job' : 'Create Job'}
      </button>
    </form>
  );
}
