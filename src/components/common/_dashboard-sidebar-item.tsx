import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";
import { ReactNode, useContext, useId, useRef, useState, useCallback, type KeyboardEvent, memo, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarContext } from "./_dashboard-sidebar";
import { cn } from "@/lib/utils";

export interface SubMenuItem {
  label: string;
  href: string;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  href?: string;
  subItems?: SubMenuItem[];
  isNavigating?: boolean;
}

interface DropdownProps extends Omit<SidebarItemProps, "subItems"> {
  subItems: SubMenuItem[];
  expanded: boolean;
  pathname: string;
}

function SidebarItemWithDropdown({ icon, text, active, alert, subItems, expanded, pathname, isNavigating }: DropdownProps) {
  const isSubItemActive = subItems.some((s) => pathname === s.href);
  const [isOpen, setIsOpen] = useState(() => isSubItemActive);
  const [focusedIndex, setFocusedIndex] = useState(() => (isSubItemActive ? 0 : -1));
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const uniqueId = useId();
  const listboxId = `sidebar-dropdown-${uniqueId}`;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (focusedIndex < 0 || !dropdownRef.current) return;
    const items = dropdownRef.current.querySelectorAll<HTMLElement>("[data-dropdown-item]");
    items[focusedIndex]?.focus();
  }, [focusedIndex]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        setFocusedIndex(-1);
      } else {
        setFocusedIndex(0);
      }
      return !prev;
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(subItems.length - 1);
          }
          break;
        case "Escape":
          if (isOpen) {
            e.preventDefault();
            close();
          }
          break;
      }
    },
    [isOpen, close, subItems.length]
  );

  const handleDropdownKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % subItems.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex(
            (prev) => (prev - 1 + subItems.length) % subItems.length
          );
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(subItems.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [subItems.length, close]
  );

  return (
    <li className="relative my-2">
      <button
        ref={triggerRef}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className={cn(
          "relative flex items-center w-full py-2.5 px-3 font-medium rounded-xl cursor-pointer transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--border-focus)",
          active || isSubItemActive ? "bg-(--bg-hover) text-(--accent-primary) shadow-sm" : "hover:bg-(--bg-hover) text-(--text-secondary)",
          expanded ? "" : "justify-center"
        )}
      >
        <div className={cn("transition-colors duration-200", active || isSubItemActive ? "text-(--accent-primary)" : "text-(--text-muted) group-hover:text-(--accent-primary)")}>{icon}</div>
        <span className={cn("overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap", expanded ? "w-27 ml-3 opacity-100" : "w-0 opacity-0")}>{text}</span>

        {expanded && (
          <ChevronDown size={16} className={cn("ml-auto shrink-0 transition-transform duration-200 text-(--text-muted)", isOpen && "rotate-180")} aria-hidden="true" />
        )}

        {alert && (
          <div className={cn("absolute right-8 w-2 h-2 rounded-full bg-(--accent-primary)", !expanded && "top-2 right-2")} aria-hidden="true" />
        )}
        {isNavigating && (
          <Loader2 size={16} className="animate-spin ml-auto text-(--accent-primary)" aria-hidden="true" />
        )}
      </button>

      {isOpen && expanded && (
        <ul
          ref={dropdownRef}
          id={listboxId}
          role="listbox"
          aria-label={`${text} sub-menu`}
          onKeyDown={handleDropdownKeyDown}
          className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-(--border-primary) pl-2"
        >
          {subItems.map((item, index) => {
            const isItemActive = pathname === item.href;
            return (
              <li key={item.href} role="option" aria-selected={isItemActive}>
                <Link
                  href={item.href}
                  data-dropdown-item
                  tabIndex={focusedIndex === index ? 0 : -1}
                  className={cn(
                    "block w-full py-2 px-3 text-sm rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:bg-(--accent-primary)/10 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-(--border-focus)",
                    isItemActive ? "bg-(--accent-primary)/10 text-(--accent-primary) font-medium" : "text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--accent-primary)"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function CollapsedTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative group">
      {children}
      <span
        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-(--text-primary) text-(--bg-primary) text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-50"
        role="tooltip"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

const SidebarItem = memo(function SidebarItem({ icon, text, active, alert, href = "#", subItems, isNavigating }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const hasSubItems = subItems && subItems.length > 0;

  const baseProps = {
    icon,
    text,
    active,
    alert,
    href,
    subItems,
    isNavigating,
  };

  if (hasSubItems) {
    return <SidebarItemWithDropdown {...baseProps} subItems={subItems!} expanded={expanded} pathname={pathname} />;
  }

  const linkContent = (
    <span className={cn("relative flex items-center py-2.5 px-3 my-2 font-medium rounded-xl cursor-pointer transition-all duration-200 group", active ? "bg-(--bg-hover) text-(--accent-primary) shadow-sm" : "hover:bg-(--bg-hover) text-(--text-secondary)", expanded ? "" : "justify-center")} aria-current={active ? "page" : undefined}>
      <span className={cn("transition-colors duration-200 shrink-0", active ? "text-(--accent-primary)" : "text-(--text-muted) group-hover:text-(--accent-primary)")}>{icon}</span>
      <span className={cn("overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap", expanded ? "w-28 ml-3 opacity-100" : "w-0 opacity-0")} aria-hidden={!expanded}>{text}</span>
      {alert && (
        <span className={cn("absolute right-2 w-2 h-2 rounded-full bg-(--accent-primary)", !expanded && "top-2")} aria-hidden="true" />
      )}
      {isNavigating && (
        <span className={cn("animate-spin ml-auto text-(--accent-primary)", expanded ? "" : "hidden")} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </span>
      )}
    </span>
  );

  const wrappedContent = !expanded ? <CollapsedTooltip text={text}>{linkContent}</CollapsedTooltip> : linkContent;

  return (
    <li>
      <Link href={href} aria-label={!expanded ? text : undefined} className={cn("block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--border-focus)", expanded ? "" : "flex justify-center")}>
        {wrappedContent}
      </Link>
    </li>
  );
});

SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
