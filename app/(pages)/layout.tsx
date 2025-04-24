import Footer from '../_components/Footer';
import { Header } from '../_components/Header';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">{children}</main>
      <Footer />
    </div>
  );
}
