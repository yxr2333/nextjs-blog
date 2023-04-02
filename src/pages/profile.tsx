import Head from "next/head";

export default function Profile({ name }) {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main>
        <div>
          <h1>Profile</h1>
          <h2>{name}</h2>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      name: "icecreamOvO",
    },
  };
}
