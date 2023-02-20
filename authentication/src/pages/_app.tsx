import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import { SessionProvider } from "next-auth/react";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Waltid Authentication",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to WaltId Authentication Demo',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
