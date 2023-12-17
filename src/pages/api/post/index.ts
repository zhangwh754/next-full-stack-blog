import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { paginate } from '@/lib/pagination'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return createPost(req, res)
    case 'GET':
      return getPostPage(req, res)
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

// POST /api/post
async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, content, published = false } = req.body

  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
      content: content,
      published: published,
      tags: {
        create: [
          {
            tag: {
              connect: {
                id: 1,
              },
            },
          },
        ],
      },
    },
  })
  return res.json(result)
}

// GET /api/post
async function getPostPage(req: NextApiRequest, res: NextApiResponse) {
  const { pageNum } = req.query

  const result = await paginate(
    prisma.post,
    { pageNum: Number(pageNum) },
    {
      include: {
        tags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }
  )

  return res.json(result)
}
