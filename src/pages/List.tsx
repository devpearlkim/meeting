import { Link, useLocation } from 'react-router-dom'
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
  const category = queryParams.get('category') ?? []
  const search = queryParams.get('search') || ''
  const locationParam = queryParams.get('location') || ''

  useEffect(() => {
    // 나머지 값들을 state에서 가져옵니다.
    const valuesFromSearchForm = location.state || {}
    setSearchFormValues({
      ...valuesFromSearchForm,
      search,
      location: locationParam,
    })
  }, [location.state, search, locationParam])

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

  console.log(data)
  console.log(hasNextPage)

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="min-h-28">
          <div className="mx-auto max-w-screen-lg py-4">
            <MeetingSearchFrom />
            <div className="flex justify-between">
              <Link to="/write">
                <button className="rounded-md bg-pink-500 px-4 py-2 text-white">
                  글쓰기
                </button>
              </Link>
              <select className="rounded-md border border-gray-300 px-4 py-2">
                <option value="latest">최신순</option>
                <option value="oldest">오래된 순</option>
                <option value="popular">인기순</option>
              </select>
            </div>

            {data?.pages.map((page, i) => (
              <div key={i} className="flex flex-wrap justify-between gap-2">
                {page.map((post) => (
                  // <Link to={`/detail/${post.id}`} key={post.id}>
                  <Post post={post} />
                  // </Link>
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
            {hasNextPage && (
              <div
                ref={ref}
                className="h-96 bg-slate-900"
                style={{ height: 50 }}
              />
            )}
            {/* <div className="mt-6 flex gap-6"></div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default List
