import { Alfajores, CeloProvider } from "@celo/react-celo";
import '@celo/react-celo/lib/styles.css';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CeloProvider
      dapp={{
        name: "Decentralized Social Network - Celo protocol",
        description: "A decentralized social network built on the Celo Blockchain.",
        url: "https://celo-composer.netlify.app/",
        icon: "https://celo-composer.netlify.app/favicon.ico",
      }}
      network={Alfajores}
    >
      <Component {...pageProps} />
    </CeloProvider>
  );
}

export default MyApp;
