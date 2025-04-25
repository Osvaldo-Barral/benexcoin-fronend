'use client'

import { ComisionesLista } from '@/components/ComisionesLista'
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ComisionesPage() {
    const searchParams = useSearchParams();
    const id_usuario = Number(searchParams!.get('id_usuario'));



    return (
        <main className="section">
            <div className="container">
                <ComisionesLista idUsuario={id_usuario} />
            </div>
        </main>
    )
}
