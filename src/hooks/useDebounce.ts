import debounce from "lodash/debounce";
import { useRef, useEffect, useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any[]) => any>(callback: T)  => {
    const ref = useRef<T | null>(null);
  
    useEffect(() => {
      ref.current = callback;
    }, [callback]);
  
    const debouncedCallback = useMemo(() => {
      const func = () => {
        ref.current?.();
      };
  
      return debounce(func, 450);
    }, []);
  
    return debouncedCallback;
  };