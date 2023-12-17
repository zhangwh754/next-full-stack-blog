import { Prisma } from '@prisma/client'

export interface Pagination {
  pageNum: number
  pageSize?: number
}

/**
 * @description: 传入Query Builder，返回分页结果
 * @param {prisma} pm
 * @param {Pagination} paginationOption pageNum必传
 */
export async function paginate(pm: Prisma.PostDelegate, paginationOption: Pagination, args?: object) {
  const { pageNum, pageSize = 10 } = paginationOption

  const offset = pageSize * (pageNum - 1)

  const list = await pm.findMany({
    skip: offset,
    take: pageSize,
    ...args,
  })

  return {
    pageNum,
    pageSize,
    list,
  }
}
