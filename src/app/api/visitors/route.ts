import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET() {
    try {
        // Атомарно увеличиваем счетчик
        const { data, error } = await supabase.rpc('increment_visitor_count')

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            )
        }

        // Получаем текущее значение
        const { data: visitorData, error: fetchError } = await supabase
            .from('visitors')
            .select('count')
            .single()

        if (fetchError) {
            return Response.json(
                { error: fetchError.message },
                { status: 500 }
            )
        }

        return Response.json({ num_of_visits: visitorData.count })
    } catch (error) {
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}