import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath: import.meta.env.BASE_URL, // picks up `base` from vite.config.ts automatically
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error }) => (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl">Something broke.</h1>
          <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    ),
  });
  return router;
};