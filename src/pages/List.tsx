import { useLocation } from 'react-router-dom'
import MeetingSearchFrom from '../features/meetings/MeetingSearchForm'
import { Fragment, useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getPost } from '../services/apiPost.js'
import { throttle } from 'lodash'
import Post from '../features/meetings/Post.js'
import SkeletonPost from '../features/meetings/SkeletonPost .js'

const List = () => {
  const [searchFormValues, setSearchFormValues] = useState(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category')

  useEffect(() => {
    const valuesFromSearchForm = location.state
    setSearchFormValues(valuesFromSearchForm)
  }, [location.state])

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['posts', searchFormValues, category],
    queryFn: getPost,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const throttledFetchNextPage = throttle(() => {
    !isFetching && hasNextPage && fetchNextPage()
  }, 3000)

  useEffect(() => {
    if (inView) {
      throttledFetchNextPage()
    }
  }, [inView])

  return (
    <>
      <div className="overflow-hiddenpy-6 relative flex min-h-screen flex-col justify-center sm:py-12">
        <div className="min-h-28">
          <div className="mx-auto max-w-screen-lg py-4">
            <MeetingSearchFrom />
            {data?.pages.map((page, i) => (
              <div key={i} className="flex flex-wrap justify-between gap-2">
                {page.map((post) => (
                  <Post key={post.postId} post={post} />
                ))}
              </div>
            ))}
            {isFetching && hasNextPage && (
              <div className="flex flex-wrap justify-between gap-2">
                {[...Array(15)].map((_, i) => (
                  <SkeletonPost key={i} />
                ))}
              </div>
            )}
            <div
              ref={ref}
              className="h-96 bg-slate-900"
              style={{ height: 50 }}
            />
            <div className="mt-6 flex gap-6"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
