import { useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <>
    <div className="flex items-center">
      <button className="navBtn" onClick={handleToggle}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
    </>
  );
}

export default ThemeToggle

