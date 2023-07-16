import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import { EuiThemeColorMode } from "@elastic/eui";

const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));


export default function ThemeSelector({children}:{children:ReactNode;}) {
    const [theme, setTheme] = useState<EuiThemeColorMode>("light")
    useEffect(() => {
        const theme = localStorage.getItem("zoom-theme");
        if(theme) {
            setTheme(theme as EuiThemeColorMode);
        }
    });
  return (
    <>
    <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme /> }

    </Suspense>
    {children}
    </>
  );
}
