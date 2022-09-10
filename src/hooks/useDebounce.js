import { useEffect, useState } from "react";

function useDebounce(valueSearch) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(valueSearch);
    }, 500);

    return () => clearTimeout(timeout);
  }, [valueSearch]);

  return value;
}

export default useDebounce;
