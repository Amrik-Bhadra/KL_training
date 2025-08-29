import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect, // Import useEffect
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link, Outlet, useLocation, useMatches } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowBigRightDash,
  ArrowBigLeftDash,
  House,
  Redo,
  Clock,
} from "lucide-react";

// --- Data and Type Definitions ---

interface SidebarNavItem {
  to: string;
  text: string;
  icon: ReactNode;
  alert?: boolean;
}

// Centralized navigation data
const sidebarNavItems: SidebarNavItem[] = [
  { to: "/", text: "Home", icon: <House size={20} /> },
  { to: "/gsap-to", text: "GSAP To()", icon: <ArrowBigRightDash size={20} /> },
  {
    to: "/gsap-from",
    text: "GSAP From()",
    icon: <ArrowBigLeftDash size={20} />,
  },
  { to: "/gsap-from-to", text: "GSAP FromTo()", icon: <Redo size={20} /> },
  { to: "/gsap-timeline", text: "GSAP Timeline", icon: <Clock size={20} /> },
];

interface SidebarItemProps extends SidebarNavItem {
  active?: boolean;
  isCollapsed: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

// --- Components ---

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  isCollapsed,
  to,
}: SidebarItemProps) => (
  <Link to={to}>
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-300/40 hover:text-indigo-300 text-gray-300/70"
      }
    `}
    >
      {icon}
      {!isCollapsed && (
        <span
          className={`overflow-hidden ${isCollapsed ? "w-0" : "w-52 ml-3"}`}
        >
          {text}
        </span>
      )}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            isCollapsed ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip text */}
      {isCollapsed && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  </Link>
);

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { pathname } = useLocation(); // Hook to get the current path

  return (
    <aside className="h-screen border-r border-gray-300/30">
      <nav className="h-full flex flex-col bg-[#222] border-r border-gray-700 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-700">
          {!isCollapsed && <h1 className="font-bold text-2xl">Logo</h1>}
          <button
            onClick={() => setIsCollapsed((curr) => !curr)}
            className="p-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-gray-200"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <ul className="flex-1 p-3">
          {sidebarNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              {...item}
              isCollapsed={isCollapsed}
              active={pathname === item.to} // Set active based on current path
            />
          ))}
        </ul>

        <div className="border-t border-gray-300/30 flex p-3">
          <div className="bg-[#c7d2fe] text-[#3730a3] flex items-center justify-center h-10 w-10 rounded-lg font-semibold">
            <p>AB</p>
          </div>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden ${isCollapsed ? "w-0" : "w-52 ml-3"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-200">Amrik Bhadra</h4>
              <span className="text-xs text-gray-500">
                amrik.bhadra@gmail.com
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

const RootLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number | undefined>(
    undefined
  );

  // Hook to get the matched routes
  const matches = useMatches();
  // Get the handle from the last matched route
  const currentMatch = matches[matches.length - 1];
  const pageTitle =
    (currentMatch?.handle as { title?: string })?.title ?? "Dashboard";

  // Effect to update the document title (browser tab)
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useLayoutEffect(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.offsetWidth);
    }
  }, [isCollapsed]);

  return (
    <div className="bg-[#484848] font-sans text-gray-200">
      <div ref={sidebarRef} className="fixed top-0 left-0 h-screen z-20">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {sidebarWidth !== undefined && (
        <main
          className="transition-all duration-300 ease-in-out"
          style={{
            marginLeft: `${sidebarWidth}px`,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <div className="h-screen overflow-y-auto p-6">
            <Outlet />
          </div>
        </main>
      )}
    </div>
  );
};

export default RootLayout;
