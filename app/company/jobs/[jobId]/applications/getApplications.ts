export async function getApplications(jobId: number) {
    if (!jobId || isNaN(jobId)) {
        console.error("Invalid jobId:", jobId);
    }

    try {
        const response = await fetch(`/api/company/jobs/${jobId}/applications`,{
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch applications. Status: ${response.status}`);
        }

        const data =  await response.json();
        console.log("Fetched applications:", data);
        return data;
    }catch (error) {
        console.error("Error fetching applications:", error);
        return [];
    }
}