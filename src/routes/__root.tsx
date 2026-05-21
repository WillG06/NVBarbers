import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

// HeadContent and Scripts are removed — index.html owns the document shell.
// TanStack Router's head() still works for per-route <title> and <meta> updates;
// the router patches document.head directly in CSR mode without needing HeadContent.

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
          >
            Try again
          </button>
          <a href="/" className="px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] underline underline-offset-4">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // head() still runs on every route — the router patches document.title
  // and meta tags into the existing <head> from index.html.
  head: () => ({
    meta: [
      { name: "theme-color", content: "#1B0A02" },
    ],
  }),
  // shellComponent removed — index.html is the shell.
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
