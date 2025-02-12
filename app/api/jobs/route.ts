import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const job = await prisma.job.create({ data });
  return NextResponse.json(job);
}
