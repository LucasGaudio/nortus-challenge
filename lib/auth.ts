import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveToken(token: string, days = 7) {
  // Em produção, defina secure: true e domain adequado
  Cookies.set(TOKEN_KEY, token, {
    expires: days,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY) ?? null;
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
}

export function saveUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function removeUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

export function logout() {
  removeToken();
  removeUser();
}

// util para usar em contextos não-react (ex: interceptors)
export function logoutAndRedirect() {
  logout();
  try {
    // se estamos no browser, redireciona para o login
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  } catch (e) {
    // sem ação
  }
}
