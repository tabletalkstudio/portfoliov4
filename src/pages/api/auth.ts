import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirect") as string) || "/";

  const sitePassword = import.meta.env.SITE_PASSWORD;

  if (!sitePassword || password !== sitePassword) {
    return redirect(
      `/password?redirect=${encodeURIComponent(redirectTo)}&error=1`,
      302
    );
  }

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    [
      "portfolio_auth=authenticated",
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=604800", // 7 days
      ...(import.meta.env.PROD ? ["Secure"] : []),
    ].join("; ")
  );
  headers.append("Location", redirectTo);

  return new Response(null, {
    status: 302,
    headers,
  });
};
