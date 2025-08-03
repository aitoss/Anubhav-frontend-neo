"use client";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import NavbarMini from "../Navbar/NavbarMini";
import Footer from "../Landing/Footer/Footer";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

interface RouteLayoutConfig {
  overflow?: string;
}

const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  const pathname = usePathname();
  
  // Route configuration
  const routeConfig = {
    // Routes that should use NavbarMini instead of regular Navbar
    miniNavbarRoutes: [
      "/blog",
      "/search"
    ],
    
    // Routes that should not show Footer
    noFooterRoutes: [
      "/create"
    ],

    // Routes that need special padding (for fixed navbar)
    needsNavbarPadding: [
      "/create",
    ],

    // Routes that should have no navbar at all (if needed in future)
    noNavbarRoutes: [
      // Add routes here if needed
    ],

    // Routes that need special layout handling
    specialLayoutRoutes: {
      "/": { 
        overflow: "overflow-hidden" // Home page needs overflow hidden for animations
      }
    } as Record<string, RouteLayoutConfig>
  };
  
  // Helper function to check if current route matches any pattern
  const matchesRoute = (routes: string[]) => {
    return routes.some(route => pathname.startsWith(route));
  };

  // Determine navbar type
  const shouldUseMiniNavbar = matchesRoute(routeConfig.miniNavbarRoutes);
  const shouldShowNavbar = !matchesRoute(routeConfig.noNavbarRoutes);
  const shouldShowFooter = !matchesRoute(routeConfig.noFooterRoutes);
  const needsPadding = matchesRoute(routeConfig.needsNavbarPadding);

  // Get special layout classes for specific routes
  const getLayoutClasses = () => {
    const specialLayout = routeConfig.specialLayoutRoutes[pathname];
    return specialLayout?.overflow || "";
  };
  
  return (
    <div className={`flex min-h-screen flex-col mx-auto w-full h-full ${getLayoutClasses()}`}>
      {shouldShowNavbar && (shouldUseMiniNavbar ? <NavbarMini /> : <Navbar />)}
      <main className={`flex-1 ${needsPadding ? 'pt-[60px]' : ''}`}>
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default NavigationWrapper;
