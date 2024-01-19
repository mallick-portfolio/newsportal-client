"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Sports", "Dashboard"];
  // Latest,Politics,Crime,Opinion,Business,Sports,Entertainment,Jobs,Tech
  const menus = [
    {
      url: "/news/politics",
      title: "Politics",
    },
    {
      url: "/news/crime",
      title: "Crime",
    },
    {
      url: "/news/business",
      title: "Business",
    },
    {
      url: "/news/sports",
      title: "Sports",
    },
    {
      url: "/news/tech",
      title: "Tech",
    },
  ];

  return (
    <div className="">
      <Navbar
        position="sticky"
        maxWidth="full"
        className="container px-8"
        height={"5rem"}
        onMenuOpenChange={setIsMenuOpen}
        shouldHideOnScroll
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link href="/">
              <p className="font-bold text-inherit">NewsPort</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menus?.map((menu) => (
            <NavbarItem key={menu.title}>
              <Link color="foreground" href={menu.url}>
                {menu.title}
              </Link>
            </NavbarItem>
          ))}
          {/* {menuItems?.map((menu) => (
            <NavbarItem key={menu}>
              <Link color="foreground" href="#">
                {menu}
              </Link>
            </NavbarItem>
          ))} */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/account/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/account/register"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
