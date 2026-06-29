import { NextRequest, NextResponse } from 'next/server';
import { getDb, floorPlans, users } from '@/lib/db';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const resolvedParams = await params;
    const db = getDb();
    const [plan] = await db!
      .select({
        id: floorPlans.id,
        shareId: floorPlans.shareId,
        name: floorPlans.name,
        description: floorPlans.description,
        planData: floorPlans.planData,
        thumbnail: floorPlans.thumbnail,
        isPublic: floorPlans.isPublic,
        createdAt: floorPlans.createdAt,
        updatedAt: floorPlans.updatedAt,
        creatorName: users.name,
      })
      .from(floorPlans)
      .leftJoin(users, eq(floorPlans.userId, users.id))
      .where(
        and(
          eq(floorPlans.shareId, resolvedParams.shareId),
          eq(floorPlans.isPublic, true)
        )
      );

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan non trouvé ou non public' },
        { status: 404 }
      );
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Erreur lors de la récupération du plan partagé:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}