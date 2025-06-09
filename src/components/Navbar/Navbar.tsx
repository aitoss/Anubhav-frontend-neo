import { Menu, Pen, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AnubhavIcon } from "../ui/icon";
import { LinkButton } from "../ui/link-button";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Videos", href: "/videos" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/story" },
  { label: "GitHub", href: "https://github.com/aitoss/Anubhav-frontend-23", external: true },
];

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(currentScrollPos < prevScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  

  const navClasses = `bg-[#ffffffcc] bg-blur border-b fixed w-full h-[60px] px-0 lg:px-8 flex items-center justify-between text-[#212121] z-[9999] transition-transform transform ${visible ? "translate-y-0" : "-translate-y-full"}`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center px-4 justify-between w-full h-full relative">
        <div className="flex justify-center items-center gap-4 md:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <AnubhavIcon width="30" height="28" />
            <h4 className="text-2xl font-semibold tracking-tighter">anubhav</h4>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-1 mt-1 items-center">
            {NAV_LINKS.map(({ label, href, external }) => (
              <Link
                key={href}
                href={href}
                target={external ? "_blank" : "_self"}
                rel={external ? "noopener noreferrer" : ""}
                className="text-sm font-medium px-2 py-1 rounded-md hover:bg-[#efefef] transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <LinkButton href="/create" variant="outline">
            Request Article
          </LinkButton>
          <LinkButton href="/create" variant="default" icon={<Pen />}>
            Write Article
          </LinkButton>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="outline"
          className="md:hidden size-9 p-2"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          asChild
        >
          {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Menu */}
        {mobileNavOpen && (
          <div className="absolute top-[60px] left-0 w-full shadow-xs bg-white justify-between z-[9998] flex flex-col gap-2 p-4 rounded-b-2xl md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href, external }) => (
                <Link
                  key={href}
                  href={href}
                  target={external ? "_blank" : "_self"}
                  rel={external ? "noopener noreferrer" : ""}
                  className="text-base font-medium px-2 py-1 rounded-md hover:bg-[#efefef] transition"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <LinkButton href="/create" variant="outline" className="w-full">
                Request Article
              </LinkButton>
              <LinkButton
                href="/create"
                variant="default"
                icon={<Pen />}
                className="w-full"
              >
                Write Article
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;