import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET(req: Request, { params }: { params: { jobId: string }}) {

    const { jobId } = await params;

    try {
        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }
        const job = await prisma.job.findUnique({
            where: { id: parseInt(jobId) },
        });

        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 400 });
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ message: "Internal Server Error"}, { status : 500 });
    }
}