import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: { job: true },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { candidateName, candidateEmail, resumeUrl, jobId} = await req.json();

    if (!candidateName || !candidateEmail || !resumeUrl || jobId == null ) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const newApplication = await prisma.application.create({
      data: { candidateName, candidateEmail, resumeUrl, jobId: Number(jobId) },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}