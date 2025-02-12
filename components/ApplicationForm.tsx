'use client';

import { useState } from 'react';

interface ApplicationFormProps {
  jobId: string;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [form, setForm] = useState({
    candidateName: '',
    candidateEmail: '',
    resumeUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch(`/company/jobs/${jobId}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setMessage('Application submitted successfully!');
      setForm({ candidateName: '', candidateEmail: '', resumeUrl: '' });
    } else {
      setMessage('Failed to submit application.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold">Apply for Job</h1>
      <input type="text" name="candidateName" placeholder="Your Name" value={form.candidateName} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input type="email" name="candidateEmail" placeholder="Your Email" value={form.candidateEmail} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <input type="url" name="resumeUrl" placeholder="Resume Link (e.g., Google Drive, Dropbox)" value={form.resumeUrl} onChange={handleChange} className="w-full p-2 border rounded" required/>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Submit Application
      </button>
      {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
    </form>
  );
}
