// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, getProducts } from '@/service/producs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  if (req.method === 'GET') {
    const products = await getProducts();
    return res.status(200).json(products);
  }
  res.status(200);
}

// 보시면 좋을 서버리스 영상: https://youtu.be/E4uhnFOwevA
