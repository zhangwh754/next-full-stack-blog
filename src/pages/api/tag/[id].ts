import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const tagId = req.query.id

  switch (req.method) {
    case 'DELETE':
      return handleDELETE(tagId, res)
    case 'GET':
      return handleGET(tagId, res)
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

async function handleGET(tagId: unknown, res: NextApiResponse<any>) {
  const post = await prisma.tag.findFirst({
    where: { id: Number(tagId) },
  })
  return res.json(post)
}

// DELETE /api/post/:id
async function handleDELETE(tagId: unknown, res: NextApiResponse<any>) {
  const post = await prisma.tag.delete({
    where: { id: Number(tagId) },
  })
  return res.json(post)
}
