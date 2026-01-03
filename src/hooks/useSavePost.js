import { useMemo } from 'react'

export const useSortedSavePost = (savePosts, sort) => {
  const sortedSavePosts = useMemo(() => {
    if (sort) {
      return [...savePosts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return savePosts
  }, [sort, savePosts])
  return sortedSavePosts
}

export const useSavePosts = (savePosts, sort, query) => {
  const sortedSavePosts = useSortedSavePost(savePosts, sort)
  const sortedAndSearchedSavePosts = useMemo(() => {
    return sortedSavePosts.filter((savePost) =>
      savePost.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, sortedSavePosts])
  return sortedAndSearchedSavePosts
}
