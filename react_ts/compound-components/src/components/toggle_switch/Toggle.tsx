import React, { createContext, useContext, useState, ReactNode } from "react";

// Context to share toggle state and toggle function
interface ToggleContextType {
  on: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error(
      "Toggle components must be used within a <Toggle> provider"
    );
  }
  return context;
}

// Parent component: provides state via context
export const Toggle: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Shows children only when toggle is ON
export const ToggleOn: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { on } = useToggleContext();
  return on ? <>{children}</> : null;
};

// Shows children only when toggle is OFF
export const ToggleOff: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { on } = useToggleContext();
  return !on ? <>{children}</> : null;
};

// Button to toggle the state
export const ToggleButton: React.FC = () => {
  const { on, toggle } = useToggleContext();
  return (
    <button onClick={toggle} style={{ margin: "1em", padding: "0.5em 1em" }}>
      {on ? "Turn Off" : "Turn On"}
    </button>
  );
};
