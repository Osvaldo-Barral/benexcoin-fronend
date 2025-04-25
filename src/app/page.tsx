
import { ContactoLista } from "@/components/ContactotLista";
import { Banexcoin } from '../components/Banexcoin';

export default function HomePage() {
  return (
    <main className="section">
      <div className="container">
        <Banexcoin />
        <ContactoLista />
      </div>
    </main>
  );
}

