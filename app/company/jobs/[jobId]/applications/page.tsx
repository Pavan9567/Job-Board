"use client";

import { useEffect, useState } from "react";
import { getApplications } from './getApplications';
import { useParams } from "next/navigation";

export default function ApplicationsPage() {

    const params = useParams();
    const jobId = params.jobId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const data = await getApplications(Number(jobId));
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchApplications();
    }, [jobId]);

    if (loading) return <p className="text-center text-lg">Loading applications...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700">Job Applications</h2>
            {applications.length === 0 ? (
                <p className="text-gray-500 mt-4">No applications found.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {applications.map((app) => (
                        <li key={app.id} className="border p-4 rounded-md shadow">
                            <p className="font-medium text-gray-800">{app.candidateName}</p>
                            <p className="text-gray-600">Email: {app.candidateEmail}</p>
                            <p><a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Resume</a></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

