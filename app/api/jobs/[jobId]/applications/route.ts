import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function POST(req: Request, { params }: { params: { jobId: string } }) {
  const data = await req.json();
  const application = await prisma.application.create({
    data: { ...data, jobId: Number(params.jobId) },
  });
  return NextResponse.json(application);
}
