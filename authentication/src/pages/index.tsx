import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import Link from "next/link";

export default function Home({ address, session }: AuthenticatedPageProps) {
  return address ? (
    <>
      <ConnectButton />
      <h1>Authenticated</h1>
    </>
  ) : (
    <>
      <ConnectButton />
      <h1>Unauthenticated</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
