"use client";

import Image from "next/image";
import { user } from "@/utils/auth_user";
import { usePathname } from "next/navigation";
import { createContext, useState, useCallback, useMemo, memo, useEffect, useRef } from "react";
import { SidebarItem } from "./_dashboard-sidebar-item";
import { settingsManifest } from "@/lib/settings-manifest";
import { ChevronFirst, ChevronLast, LogOut, SunIcon, LayoutDashboard, ShieldUser, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const SidebarContext = createContext({ expanded: true });

const MENU_ITEMS = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", href: "/dashboard" },
  { icon: <ShieldUser size={20} />, text: "Employees", href: "/employees" },
  {
    icon: <ShieldCheck size={20} />,
    text: "Administration",
    href: "/setting",
    subItems: settingsManifest.map((s) => ({ label: s.label, href: s.href })),
  },
];

const SidebarComponent = memo(function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const toggleExpanded = useCallback(() => {
    setExpanded((curr) => !curr);
  }, []);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const bottomActions = useMemo(
    () => (
      <>
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-(--bg-hover) transition-all cursor-pointer group",
            expanded ? "" : "justify-center"
          )}
        >
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold overflow-hidden shadow-md ring-2 ring-(--bg-card)">
              {user.avatar ? (
                <Image src={user.avatar} width={36} height={36} alt={user.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <span>{user.name?.charAt(0)?.toUpperCase() || "?"}</span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-(--status-online) border-2 border-(--bg-card) rounded-full" aria-hidden="true" />
          </div>

          {expanded && (
            <div className="overflow-hidden transition-all duration-300 w-24 opacity-100">
              <h4 className="font-semibold text-(--text-primary) text-sm truncate">{user.name || "User"}</h4>
              <p className="text-xs text-(--text-muted) truncate">View Profile</p>
            </div>
          )}
        </div>

        <button
          onClick={openSettings}
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl text-(--text-muted) hover:bg-(--bg-hover) hover:text-(--text-primary) cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus)",
            expanded ? "" : "justify-center"
          )}
          title="Settings"
        >
          <div className="flex items-center justify-center w-9 h-9">
            <SunIcon size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <span
            className={cn(
              "overflow-hidden transition-all duration-300 font-medium text-sm text-left",
              expanded ? "w-24 opacity-100" : "w-0 opacity-0 hidden"
            )}
          >
            Theme
          </span>
        </button>

        <button
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl text-(--text-muted) hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-error)",
            expanded ? "" : "justify-center"
          )}
          title="Logout"
        >
          <div className="flex items-center justify-center w-9 h-9">
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <span
            className={cn(
              "overflow-hidden transition-all duration-300 font-medium text-sm text-left",
              expanded ? "w-24 opacity-100" : "w-0 opacity-0 hidden"
            )}
          >
            Logout
          </span>
        </button>
      </>
    ),
    [expanded, openSettings]
  );

  return (
    <div className="relative">
      <aside
        className={cn(
          "sticky top-0 h-[calc(100vh-2rem)] flex flex-col bg-(--bg-card) border-r border-(--border-primary) rounded-3xl shadow-sm transition-all duration-300 ease-in-out",
          expanded ? "w-59" : "w-20"
        )}
        aria-label="Sidebar"
      >
        <div className={cn("p-4 pb-2 flex items-center h-16", expanded ? "justify-between" : "justify-center")}>
          <div className="w-9 h-9 rounded-full bg-[#e9ecef] dark:bg-[#3d4a51] shrink-0 mr-1.5 mb-0.5 overflow-hidden">
            {user.organisation_employees?.organisation.logo ? (
              <Image src={user.organisation_employees?.organisation.logo} alt="Organisation logo" width={36} height={36} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium bg-[#00a884]">
                {user.organisation_employees?.organisation.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-300", expanded ? "w-full opacity-100" : "w-0 opacity-0 hidden")}>
            <h1 className="font-bold text-xl text-(--text-primary) whitespace-nowrap truncate tracking-tight">{user.organisation_employees?.organisation?.name}</h1>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <nav ref={navRef} className="flex-1 px-3 py-4" aria-label="Main navigation">
            <ScrollArea>
              <ScrollViewport>
                <ul className="space-y-1">
                  {MENU_ITEMS.map((item) => (
                    <SidebarItem
                      key={item.text}
                      icon={item.icon}
                      text={item.text}
                      href={item.href}
                      active={pathname === item.href}
                      subItems={item.subItems}
                      isNavigating={isNavigating}
                    />
                  ))}
                </ul>
              </ScrollViewport>
            </ScrollArea>
          </nav>
        </SidebarContext.Provider>

        <Separator className="mx-2" />

        <div className={cn("p-3", expanded ? "" : "flex flex-col items-center")}>{bottomActions}</div>
      </aside>

        <button
          onClick={toggleExpanded}
          className="absolute -right-3 top-14 p-1.5 rounded-lg bg-(--bg-hover) hover:bg-(--bg-active) text-(--accent-primary) cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus)"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
        >
        {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
      </button>

      <div
        className={cn("fixed inset-0 z-50 transition-opacity duration-300", settingsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden={!settingsOpen}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeSettings}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Theme settings"
          className={cn(
            "absolute inset-y-0 right-0 w-full max-w-sm bg-(--bg-card) shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
            settingsOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-(--border-primary)">
            <h3 className="font-semibold text-(--text-primary)">Theme</h3>
            <button
              onClick={closeSettings}
              className="p-2 hover:bg-(--bg-hover) rounded-full transition-all text-(--text-muted) cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-card)"
              aria-label="Close settings"
            >
              <SunIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

SidebarComponent.displayName = "Sidebar";

export default SidebarComponent;
