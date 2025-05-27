import Footer from '../_components/Footer';
import { Header } from '../_components/Header';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className=" flex-1 h-[90vh]  overflow-auto scrollbar-custom flex items-stretch justify-center   bg-gradient-to-b from-green-50 to-white text-gray-800">{children}</main>
      <Footer />
    </div>
  );
}
