import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Вставляем сообщение в базу
        const { error } = await supabase
            .from('messages')
            .insert([
                {
                    name: data.name,
                    message: data.message
                }
            ])

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return Response.json({ status: 'success' })
    } catch (error) {
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        // Получаем все сообщения
        const { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return Response.json({ messages })
    } catch (error) {
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}