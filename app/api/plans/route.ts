import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb, floorPlans } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const latest = searchParams.get('latest');

    const db = getDb();
    const baseQuery = db!
      .select()
      .from(floorPlans)
      .where(eq(floorPlans.userId, session.user.id))
      .orderBy(desc(floorPlans.updatedAt));

    // If latest=true, limit to 1 result
    const plans = await (latest === 'true' ? baseQuery.limit(1) : baseQuery);

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Erreur lors de la récupération des plans:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, planData, thumbnail, isPublic } = body;

    if (!name || !planData) {
      return NextResponse.json(
        { error: 'Nom et données du plan requis' },
        { status: 400 }
      );
    }

    const db = getDb();
    const [newPlan] = await db!
      .insert(floorPlans)
      .values({
        userId: session.user.id,
        name,
        description,
        planData,
        thumbnail,
        isPublic: isPublic || false,
      })
      .returning();

    return NextResponse.json({ plan: newPlan }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du plan:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}