import React, { useState } from "react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "./Icons"; // Optional icons for better UI
import navData from "./navData.json"; // JSON file for dynamic data
import { ThemeToggle } from "../theme-toggle";

const MainNav = ({ isSignedIn = false }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 ">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">Chat with AI</span>

        {/* Navigation Links */}
        {/* <ul className="hidden md:flex space-x-6">
          {navData.links.map((link) => (
            <li key={link.id}>
              <a href={link.href} className="hover:text-gray-300 transition">
                {link.label}
              </a>
            </li>
          ))}
        </ul> */}
      </div>

      {/* Right-side Actions */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        {!isSignedIn ? (
          <>
            {/* Sign Up and Log In Buttons */}
            <Button variant="default">Sign In</Button>
            <Button variant="default" size={"default"}>
              Log In
            </Button>
          </>
        ) : (
          <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <DropdownMenuTrigger>
              <button className="flex items-center space-x-2">
                <Icons.User size={24} /> {/* Profile Icon */}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navData.userMenu.map((item) => (
                <DropdownMenuItem key={item.id} onClick={item.onClick}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
