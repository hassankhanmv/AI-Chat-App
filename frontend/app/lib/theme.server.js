import { json } from "@remix-run/node";
import { commitSession, getCurrentSession } from "./session.server";

const THEME_PREFERENCE_KEY = "theme";

export const createThemeCookie = async (request, theme) => {
  const session = await getCurrentSession(request);
  session.set(THEME_PREFERENCE_KEY, theme);
  const headers = new Headers({
    "Set-Cookie": await commitSession(session),
  });
  return json(
    { theme },
    {
      headers,
    }
  );
};

// export const getThemeFromCookie = async (request) => {
//   const session = await getCurrentSession(request);
//   const theme = session.get(THEME_PREFERENCE_KEY) || "system";
//   return theme;
// };

export const getThemeFromCookie = async (request) => {
  const session = await getCurrentSession(request);
  return session.get("theme") || "system";
};
