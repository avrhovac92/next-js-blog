// src/pages/_app.tsx
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType, NextPageContext } from 'next/dist/shared/lib/utils';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';
import '../styles/globals.css';
import { getBaseUrl } from '../utils/url';
import { trpc } from '../utils/trpc';
import { UserContextProvider } from '../context/user.context';

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data } = trpc.useQuery(['user.me']);

  return (
    <UserContextProvider value={data}>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

const headers = (ctx: NextPageContext | undefined) => {
  if (ctx?.req) {
    return {
      ...ctx.req.headers,
      'x-ssr': '1',
    };
  }

  return {};
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    const links = [loggerLink(), httpBatchLink({ maxBatchSize: 10, url })];

    return {
      links,
      transformer: superjson,
      headers: () => headers(ctx),
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  ssr: true,
})(MyApp);
