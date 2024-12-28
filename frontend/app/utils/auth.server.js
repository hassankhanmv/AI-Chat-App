import { redirect } from "@remix-run/node";

export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("Secret not specified, it must be set");

const storage = createCookieSessionStorage({
  cookie: {
    name: "remix-mongo-auth",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function registerUser(form) {
  const userExists = await prisma.user.count({ where: { email: form.email } });
  if (userExists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }

  const newUser = await createUser(form);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: {
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        },
      },
      { status: 400 }
    );
  }
  return createUserSession(newUser.id, "/");
}

async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, profile: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/auth/login?${searchParams.toString()}`);
  }
  return userId;
}
