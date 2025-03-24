import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import Header from "./Header"

const PageLayout = ({ children } : { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <Header />
      {children}
    </div>
  )
}

export default PageLayout