import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { GoogleBusinessService } from '@/services/GoogleBusinessService';

export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const service = new GoogleBusinessService();
    const result = await service.revalidatePermissions(userId);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('Erro ao revalidar permissões:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const service = new GoogleBusinessService();
    const result = await service.checkPermissions(userId);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
