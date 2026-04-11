import { defineMiddleware } from "astro:middleware";
import { getCollection } from "astro:content";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only check /projects/* routes
  if (!pathname.startsWith("/projects/")) {
    return next();
  }

  // Extract slug from path
  const slug = pathname.replace("/projects/", "").replace(/\/$/, "");

  // Look up the project to check if it's protected
  const projects = await getCollection("projects");
  const project = projects.find((p) => p.data.slug === slug);

  if (!project || !project.data.protected) {
    return next();
  }

  // Check for auth cookie
  const cookies = context.request.headers.get("cookie") || "";
  const hasAuth = cookies.split(";").some((c) =>
    c.trim().startsWith("portfolio_auth=authenticated")
  );

  if (hasAuth) {
    return next();
  }

  // Redirect to password page
  return context.redirect(
    `/password?redirect=${encodeURIComponent(pathname)}`,
    302
  );
});
