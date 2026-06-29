import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb, floorPlans } from '@/lib/db';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const db = getDb();
    const [plan] = await db!
      .select()
      .from(floorPlans)
      .where(
        and(
          eq(floorPlans.id, resolvedParams.id),
          eq(floorPlans.userId, session.user.id)
        )
      );

    if (!plan) {
      return NextResponse.json({ error: 'Plan non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Erreur lors de la récupération du plan:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, planData, thumbnail, isPublic } = body;

    // Build update object, only including fields that are provided
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (planData !== undefined) updateData.planData = planData;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (isPublic !== undefined) updateData.isPublic = isPublic;

    const db = getDb();
    const [updatedPlan] = await db!
      .update(floorPlans)
      .set(updateData)
      .where(
        and(
          eq(floorPlans.id, resolvedParams.id),
          eq(floorPlans.userId, session.user.id)
        )
      )
      .returning();

    if (!updatedPlan) {
      return NextResponse.json({ error: 'Plan non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ plan: updatedPlan });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plan:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const db = getDb();
    const [deletedPlan] = await db!
      .delete(floorPlans)
      .where(
        and(
          eq(floorPlans.id, resolvedParams.id),
          eq(floorPlans.userId, session.user.id)
        )
      )
      .returning();

    if (!deletedPlan) {
      return NextResponse.json({ error: 'Plan non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du plan:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}