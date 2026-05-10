import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#E8EDE5] text-[#2A3B32] overflow-hidden">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
