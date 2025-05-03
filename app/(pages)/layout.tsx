import Footer from '../_components/Footer';
import { Header } from '../_components/Header';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="h-full flex-1 flex items-stretch justify-center   bg-gradient-to-b from-green-50 to-white text-gray-800">{children}</main>
      <Footer />
    </div>
  );
}
