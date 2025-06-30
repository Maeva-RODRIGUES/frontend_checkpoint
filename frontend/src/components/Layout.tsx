import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
