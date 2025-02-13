"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ApplyForJob() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<any>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!candidateName || !candidateEmail || !resumeUrl) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateName, candidateEmail, resumeUrl, jobId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      setSuccess("Application submitted successfully!");
      setCandidateName("");
      setCandidateEmail("");
      setResumeUrl("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      {job ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Apply for {job.title} at {job.company}</h1>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required/>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required/>
            </div>
            <div>
              <label className="block text-gray-700">Resume URL</label>
              <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Apply Now
            </button>
          </form>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}
