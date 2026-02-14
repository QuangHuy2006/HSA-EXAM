import { NavLink} from "react-router-dom";
import type { ReactNode } from "react";
interface LayoutProps {
    children?: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const linkClass =
    "px-4 py-2 rounded-lg transition font-medium";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* NAVBAR */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex gap-4">
          
          <NavLink
            to="/question"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`
            }
          >
            Question
          </NavLink>
          <NavLink
            to="/exam"
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`
            }
          >
            Exam
          </NavLink>

        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
