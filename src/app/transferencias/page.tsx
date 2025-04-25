'use client'
import TransaccionesLista from '@/components/TransaccionesLista';
import { useSearchParams } from 'next/navigation';

export default function TransferenciasPage() {
    const searchParams = useSearchParams();
    const tipo = searchParams!.get('tipo') === 'recibidas' ? 'recibidas' : 'realizadas';
    const id_usuario = Number(searchParams!.get('id_usuario'));


    return (
        <main className="section">
            <div className="container">
                <TransaccionesLista tipo={tipo} idUsuario={id_usuario} />
            </div>
        </main>
    );
}
