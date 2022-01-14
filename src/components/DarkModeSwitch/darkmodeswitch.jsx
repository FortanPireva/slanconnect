import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import AppButton from "../AppButton/AppButton";

export default function DarkModeSwitcher() {
  const [enabled, setEnabled] = useState(false);
  function handleChange(e) {
    if (!enabled) {
      localStorage.theme = "dark";
    } else localStorage.theme = "light";
    setEnabled(!enabled);
  }
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setEnabled(true);
    }
  });
  return (
    <AppButton onClick={handleChange}>
      {enabled ? (
        <MdDarkMode size="2.5em" />
      ) : (
        <MdOutlineDarkMode size="2.5em" />
      )}
    </AppButton>
  );
}
