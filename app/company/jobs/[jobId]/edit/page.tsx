"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditJobPage() {
    const { jobId } = useParams();
    const router = useRouter();
    const [job, setJob] = useState({ title: "", company: "", description: "", });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/company/jobs/${jobId}`);
                if (!response.ok) throw new Error("Failed to fetch job");
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/company/jobs/${jobId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(job),
            });

            if (!response.ok) throw new Error("Failed to update job");
            router.push("/company/jobs");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/company/jobs/${jobId}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete job");
            router.push("/company/jobs");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p className="text-blue-500">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} className="w-full p-2 border rounded" placeholder="Job Title" required/>
                <input type="text" value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} className="w-full p-2 border rounded" placeholder="Company Name" required/>
                <textarea value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} className="w-full p-2 border rounded" placeholder="Job Description" required/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Job
                </button>
            </form>
            <button onClick={handleDelete} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Delete Job
            </button>
        </div>
    );
}
