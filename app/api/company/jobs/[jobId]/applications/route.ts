import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params?: { jobId?: string} }) {
    
    try {
        const jobId = context.params?.jobId;

        if (!jobId) {
            return NextResponse.json({ error: "Missing jobId parameter"}, { status: 400});
        }    

        const applications = await prisma.application.findMany({
            where: { jobId: Number(jobId) },
        });

        return NextResponse.json(applications, { status: 200 });
    }catch (error) {
        console.error("Database Query Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
