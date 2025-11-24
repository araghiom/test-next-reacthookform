"use client";

import { Navbar } from "@/components/shared/Navbar";
import { LoginForm } from "@/components/ui/LoginForm";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Next App
            </h1>
            <Navbar />
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <LoginForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;