import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">404 — Not Found</p>
        <h1 className="mt-6 font-display text-6xl">Lost in the mirror.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're after doesn't exist — or it's been retired.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
        >
          Back to the shop →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">Something didn't sit right.</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-foreground px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >Try again</button>
          <a href="/" className="px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] underline underline-offset-4">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NV Barbers — Modern Barbering House, Nottingham" },
      { name: "description", content: "A modern barbering house in Nottingham. Signature cuts, traditional hot shaves, and discreet hair restoration. By appointment." },
      { name: "author", content: "NV Barbers" },
      { name: "theme-color", content: "#1B0A02" },
      { property: "og:title", content: "NV Barbers — Nottingham" },
      { property: "og:description", content: "Modern barbering. Traditional craft. Hockley, Nottingham." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NV Barbers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "NV Barbers",
          image: "/og.jpg",
          "@id": "https://nvbarbers.co.uk",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 Goose Gate, Hockley",
            addressLocality: "Nottingham",
            postalCode: "NG1 1FF",
            addressCountry: "GB",
          },
          priceRange: "££",
          openingHours: "Tu-Sa 09:00-18:00",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
