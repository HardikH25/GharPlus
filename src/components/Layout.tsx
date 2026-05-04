import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <main className="w-full px-4 pb-20 pt-24 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
