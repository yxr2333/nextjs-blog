import { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  console.log(slug);
  res.status(200).json({ data: slug });
}
