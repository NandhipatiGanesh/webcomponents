import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import Header from "./components/header";
import Home from "./pages/Home";

// Lazy-loaded components
const Component = lazy(() => import("./pages/Components"));
const Post = lazy(() => import("./pages/Post"));

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-light-gray">
        <div
          className={`
            fixed left-0 top-0 z-50 h-full bg-sidebar-black
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0 md:flex
          `}
        >
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          <Header setSidebarOpen={setSidebarOpen} />

          {/* Suspense for lazy routes */}
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/component" element={<Component />} />
              <Route path="/components/:slug" element={<Post />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}
