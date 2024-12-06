import React, { useEffect, useState } from "react";
import LightButton from "../../assets/darkmode/light-mode-button.png";
import DarkButton from "../../assets/darkmode/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const element = document.documentElement; // access to htm element(the root element of the document)

  //set theme to localStorage and html root element
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  });
  return (
    <div className="relative">
      <img onClick={() => setTheme(theme === "dark" ? "light" : "dark")} src={LightButton} alt="lightmode" className={`w-12 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`} />
      <img onClick={() => setTheme(theme === "dark" ? "light" : "dark")} src={DarkButton} alt="darkmode" className={"w-12 cursor-pointer"} />
    </div>
  );
};

export default DarkMode;
