'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', company: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push('/company/jobs');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Job
        </button>
      </form>
    </div>
  );
}
