import Head from "next/head";

export default function Post({ post }) {
  console.log(post);
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main>
        <div>
          <h1>{post.id}</h1>
          <h2>{post.title}</h2>
          <h3>{post.body}</h3>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: {
        id: params.id,
        title: `Post ${params.id}`,
        body: `This is post ${params.id}`,
      },
    },
  };
}
