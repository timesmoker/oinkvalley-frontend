import { dummyPosts } from '@/data/board/dummy'

// 페이지네이션으로 게시글 불러오기
export function getPosts(page: number, pageSize = 20, preloadPages = 3) {
    const total = dummyPosts.length
    const offset = Math.max((page - Math.floor(preloadPages / 2)) * pageSize, 0)
    const limit = pageSize * preloadPages

    const paged = dummyPosts.slice(offset, offset + limit)

    return {
        total,
        offset,
        limit,
        posts: paged,
        currentSlice: paged.slice(
            pageSize * Math.floor(preloadPages / 2),
            pageSize * (Math.floor(preloadPages / 2) + 1)
        ),
    }
}
