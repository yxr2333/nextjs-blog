import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const users = await prisma.users.findMany();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const user = await prisma.users.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  const serializedUser = {
    ...user,
    create_at: user.create_at.toISOString(),
    update_at: user.update_at.toISOString(),
  };
  return { props: { user: serializedUser } };
}

export default function User({ user }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const { email } = user;
      const url = `https://www.gravatar.com/avatar/${hash(email)}?d=identicon`;

      setAvatarUrl(url);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <h1 className="text-3xl font-bold">{user.name}</h1>
      </div>
      <div className="mb-4">
        <strong className="text-gray-500 mr-2">ID:</strong>
        {user.id}
      </div>
      <div className="mb-4">
        <strong className="text-gray-500 mr-2">Email:</strong>
        {user.email}
      </div>
      <div className="mb-4">
        <strong className="text-gray-500 mr-2">Created At:</strong>
        {formatData(user.create_at)}
      </div>
      <div className="mb-4">
        <strong className="text-gray-500 mr-2">Updated At:</strong>
        {formatData(user.update_at)}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}

function formatData(date: string) {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString();
}

function hash(text) {
  const hash = text
    .trim()
    .toLowerCase()
    .split("")
    .reduce((acc, char) => {
      const code = char.charCodeAt(0);
      return `${acc}${code}`;
    }, "");

  return hash;
}
