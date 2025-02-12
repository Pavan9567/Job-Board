import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getJobs() {
  try {
    const jobs = await prisma.job.findMany();
    return jobs || [];
  }catch (error) {
    console.error("Error fetching jobs:", error)
    return [];
  }
}

export { prisma };
