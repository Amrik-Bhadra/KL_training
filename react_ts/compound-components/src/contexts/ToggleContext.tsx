import React, { createContext, useContext } from "react";

interface ToggleContextType{
    on: boolean;
    toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

function useToggleContext(){
    const context = useContext(ToggleContext);
    if(!context) throw new Error("Toggle components must be used within <Toggle>");

    return context;
}