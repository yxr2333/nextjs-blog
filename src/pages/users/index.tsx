import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticProps() {
  const users = await prisma.users.findMany();

  return {
    props: {
      users: users.map((user) => {
        return {
          ...user,
          create_at: user.create_at.toISOString(),
          update_at: user.update_at.toISOString(),
        };
      }),
    },
  };
}

export default function UsersPage({ users }) {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user, index) => (
          <li
            key={user.id}
            className="border-b py-2 flex items-center justify-between"
          >
            <span className="text-gray-500">{index + 1}.</span>
            <a
              href={`/users/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              {user.name}
            </a>
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
