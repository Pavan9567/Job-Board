import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { jobId: string } }) {

    try {
        if (!params || !params.jobId) {
            return NextResponse.json({ error: "Missing jobId parameter"}, { status: 400});
        }

        const jobId = parseInt(params.jobId)

        if (isNaN(jobId)) {
            return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
        }

        const applications = await prisma.application.findMany({
            where: { jobId },
        });

        return NextResponse.json(applications, { status: 200 });
    }catch (error) {
        console.error("Database Query Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
