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
  const { name } = req.body

  const result = await prisma.tag.create({
    data: {
      name: name,
    },
  })
  return res.json(result)
}

// GET /api/post
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.tag.findMany({
    include: {
      posts: {
        include: {
          post: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })

  return res.json(result)
}
