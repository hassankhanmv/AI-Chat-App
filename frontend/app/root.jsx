import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";

import clsx from "clsx";

import { getThemeFromCookie } from "./lib/theme.server";
import { ThemeProvider } from "./components/theme-provider";
import styles from "./tailwind.css?url";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LiveReload,
  useFetcher,
} from "@remix-run/react";

import "./tailwind.css";
import { PreventFlashOnWrongTheme } from "remix-themes";

// Return the theme from the session storage using the loader
export async function loader({ request }) {
  const theme = await getThemeFromCookie(request);
  return json({
    theme,
  });
}

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Layout component
export function Layout({ children }) {
  const { theme = "system" } = useLoaderData() || {};
  const fetcher = useFetcher();

  const onThemeChange = (theme) => {
    fetcher.submit(
      { theme },
      {
        method: "post",
        encType: "application/json",
        action: "/api/toggleTheme",
      }
    );
  };

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        {/* <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} /> */}
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} onThemeChange={onThemeChange}>
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// App component (named export)
export default function App() {
  return <Outlet />;
}

// AppWithProviders (default export)
// export default function AppWithProviders() {
//   const data = useLoaderData();
//   return (
//     <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
//       <App />
//     </ThemeProvider>
//   );
// }
