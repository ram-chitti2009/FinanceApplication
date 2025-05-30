"use client" 
import React from 'react'
import {Moon, Sun} from "lucide-react";

export default function DarkModeToggle({defaultMode = "dark"}) {
    const [theme, setTheme] = React.useState(defaultMode);
    
    React.useEffect(() => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }, [theme]);
    
  return (

    <div>
      <button className="ghost-variant sm-size" onClick = {() => setTheme(theme === "dark" ? "light" : "dark")}>

        {theme === "dark" && <Moon className = "w-4 h-4"/>}
        {theme === "light" && <Sun className = "w-4 h-4"/>}

      </button>
    </div> 
  )
}
