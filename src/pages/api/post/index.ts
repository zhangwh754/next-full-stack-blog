import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { paginate } from '@/lib/pagination'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handleCREATE(req, res)
    case 'GET':
      return handleGET(req, res)
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

// POST /api/post
async function handleCREATE(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body

  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
    },
  })
  return res.json(result)
}

// GET /api/post
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { pageNum } = req.query

  const result = await paginate(prisma.post, { pageNum: Number(pageNum) })

  return res.json(result)
}
