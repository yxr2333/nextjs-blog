import { NextApiRequest, NextApiResponse } from "next";

export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
};

export type Data = {
  posts: Post[];
};

export const posts: Post[] = [
  {
    id: 1,
    title: "First Post",
    body: "This is the first post",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Second Post",
    body: "This is the second post",
    author: "John Doe",
  },
];
export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ posts });
}
