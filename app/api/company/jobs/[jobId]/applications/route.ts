import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { jobId: string } }) {

    const { jobId } = context.params;

    if (!jobId) {
        return NextResponse.json({ error: "Missing jobId parameter"}, { status: 400});
    }

    try {
        const applications = await prisma.application.findMany({
            where: { jobId: parseInt(jobId) },
        });

        return NextResponse.json(applications, { status: 200 });
    }catch (error) {
        console.error("Database Query Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
