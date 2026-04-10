import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request, { params }) {
  try {
    // No Next.js 15 os params podem ter q ser aguardados, mas no 13/14 pode ser desestruturado direto, porém usar await é seguro desde o 14 se config async for permitida.
    // Pra compatibilidade geral:
    const { id } = await params;
    const body = await request.json();
    const { nome, email } = body;
    
    if (!nome) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
    }
    
    const query = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
    await pool.execute(query, [nome, email || null, id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na edição:', error);
    return NextResponse.json({ error: 'Erro ao editar cliente' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const query = 'DELETE FROM clientes WHERE id = ?';
    await pool.execute(query, [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na exclusão:', error);
    return NextResponse.json({ error: 'Erro ao deletar cliente' }, { status: 500 });
  }
}
