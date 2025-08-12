import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(error){
            console.warn(`Error reading localstorage key = ${key}:`, error);
            return initialValue;
        }
    });

    useEffect(()=>{
        try{
            localStorage.setItem(key, JSON.stringify(initialValue));
        }catch(error){
            console.warn('Error in storing value in localstorage', error);
        }
    }, [storedValue, key, initialValue]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;