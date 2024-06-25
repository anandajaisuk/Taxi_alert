import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all signals from the database
    const signals = await prisma.signal.findMany({
      orderBy: {
        createdAt: 'desc' // Sort by creation time, newest first
      }
    });

    return new Response(JSON.stringify(signals), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching signals:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const { Alert, Signal } = await request.json();

    // Count the number of signals
    const signalCount = await prisma.signal.count();

    // If there are 25 or more signals, delete the oldest one
    if (signalCount >= 25) {
      const oldestSignal = await prisma.signal.findFirst({
        orderBy: {
          createdAt: 'asc'
        }
      });

      if (oldestSignal) {
        await prisma.signal.delete({
          where: {
            id: oldestSignal.id
          }
        });
      }
    }

    // Create the new signal
    const newSignal = await prisma.signal.create({
      data: {
        Alert,
        Signal
      }
    });

    return new Response(JSON.stringify(newSignal), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error creating signal:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE() {
  try {
    // Delete all signals from the database
    await prisma.signal.deleteMany({});

    return new Response(JSON.stringify({ message: "All signals deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error deleting signals:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}