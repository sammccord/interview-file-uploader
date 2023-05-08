import { type NextPage } from "next";
import Head from "next/head";
import { GiphySearch } from "../components/GiphySearch";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Giphy Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Giphy Search
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <GiphySearch />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
