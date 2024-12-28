import { redirect } from "@remix-run/node";
import { createThemeCookie } from "../lib/theme.server";

export const loader = async () => {
  return redirect("/");
};

export const action = async ({ request }) => {
  try {
    const body = await request.json();
    const theme = body.theme || "system";
    return createThemeCookie(request, theme);
  } catch (error) {
    return json({ error: "Invalid request body" }, { status: 400 });
  }
};
