import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const termo = searchParams.get('q') || '';
    
    let query = 'SELECT * FROM clientes';
    let params = [];
    
    if (termo) {
      query += ' WHERE nome LIKE ? OR email LIKE ?';
      params.push(`%${termo}%`, `%${termo}%`);
    }
    
    query += ' ORDER BY criado_em DESC';
    
    const [rows] = await pool.execute(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erro na listagem:', error);
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, email } = body;
    
    if (!nome) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
    }
    
    const query = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
    const [result] = await pool.execute(query, [nome, email || null]);
    
    return NextResponse.json({ id: result.insertId, nome, email }, { status: 201 });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar cliente' }, { status: 500 });
  }
}
