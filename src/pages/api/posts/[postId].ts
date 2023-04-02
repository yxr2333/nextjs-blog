import { NextApiRequest, NextApiResponse } from "next";
import { Post, posts } from "./index";

type Data = {
  post: Post;
};
export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { postId } = req.query;
  const post = posts.find((post) => post.id === parseInt(postId as string));
  res.status(200).json({ post });
}
