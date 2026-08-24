"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/ui/skip-link";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SkipLink />

      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          mobile-sidebar fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={closeMobileMenu} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={toggleMobileMenu} mobileMenuOpen={mobileMenuOpen} />
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto p-4 md:p-6 page-fade-in focus:outline-none">{children}</main>
      </div>
    </div>
  );
}
