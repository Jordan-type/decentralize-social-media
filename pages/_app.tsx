import { Alfajores, CeloProvider } from "@celo/react-celo";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { SnackbarProvider } from "notistack";

import { CustomThemeProvider } from "@/contexts/userTheme";
import '@celo/react-celo/lib/styles.css';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CustomThemeProvider>
    <CeloProvider
      dapp={{
        name: "Decentralized Social Network - Celo protocol",
        description: "A decentralized social network built on the Celo Blockchain.",
        url: "https://celo-composer.netlify.app/",
        icon: "https://celo-composer.netlify.app/favicon.ico",
      }}
      network={Alfajores}
    >
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
         }}
        >
          <ApolloProvider client={client}>
            <div suppressHydrationWarning>
              {typeof window === "undefined" ? null : (
                  <Component {...pageProps} />
              )}
            </div>
          </ApolloProvider>
      </SnackbarProvider>
    </CeloProvider>
    </CustomThemeProvider>
  );
}

export default MyApp;
