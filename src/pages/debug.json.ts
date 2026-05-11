import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env ?? {};

  return new Response(
    JSON.stringify(
      {
        test: "builds-preview-override-test",
        vars: {
          API_URL: env.API_URL ?? "NOT SET",
          ENVIRONMENT: env.ENVIRONMENT ?? "NOT SET",
          FEATURE_FLAG: env.FEATURE_FLAG ?? "NOT SET",
        },
        secrets: {
          MY_SECRET: env.MY_SECRET ? "SET (hidden)" : "NOT SET",
        },
        timestamp: new Date().toISOString(),
      },
      null,
      2
    ),
    { headers: { "Content-Type": "application/json" } }
  );
};
