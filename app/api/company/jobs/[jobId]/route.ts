import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { jobId: string} }) {
    try {

        const { jobId } = await params;
        
        const jobIdNumber = Number(jobId);
        if (isNaN(jobIdNumber)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400});

        const job = await prisma.job.findUnique({ where: { id: jobIdNumber } });

        if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

        return NextResponse.json(job, { status: 200 });
    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { jobId: string } }) {
    try {
        const jobId = Number(params.jobId);
        if (isNaN(jobId)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

        const body = await req.json();
        const { title, company, description } = body;

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: { title, company, description },
        });

        return NextResponse.json(updatedJob, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { jobId: string } }) {
    try {
        const jobId = Number(params.jobId);
        if (isNaN(jobId)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

        await prisma.job.delete({ where: { id: jobId } });

        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
}
