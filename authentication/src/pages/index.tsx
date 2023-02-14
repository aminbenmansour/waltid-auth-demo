import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";

export default function Home() {
  const { connect, connectors } = useConnect();

  return (
    <>
      <Head>
        <title>Waltid Demo Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <ConnectButton />
          </div>
          
          <h1>Welcome Onboard: </h1>
          <ul>
            <li>
              <Link href="/profile">Check profile</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
