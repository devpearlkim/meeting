import { Link, useLocation } from 'react-router-dom'
import MeetingSearchForm from '../features/meetings/MeetingSearchForm'
import { Fragment, useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getPost } from '../services/apiPost'
import { throttle } from 'lodash'
import Post from '../features/meetings/Post'
import SkeletonPost from '../features/meetings/SkeletonPost'
// import { PiSirenLight } from 'react-icons/pi'
import ReportModal from '../features/meetings/ReportModal'

const List = () => {
  const [searchFormValues, setSearchFormValues] = useState({})
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category') ?? []
  const search = queryParams.get('search') || ''
  const locationParam = queryParams.get('location') || ''
  const [showModal, setShowModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState(null)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const valuesFromSearchForm = location.state || {}
    setSearchFormValues((prevValues) => ({
      ...prevValues,
      ...valuesFromSearchForm,
      search,
      location: locationParam,
    }))
  }, [location.state, search, locationParam])

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['posts', searchFormValues, category, sort],
    queryFn: getPost,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data && lastPage.data.length > 0) {
        return lastPage.data[lastPage.data.length - 1]?.meetingId
      }
      return null
    },

    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const throttledFetchNextPage = throttle(() => {
    !isFetching && hasNextPage && fetchNextPage()
  }, 3000)

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      throttledFetchNextPage()
    }
  }, [inView, hasNextPage, isFetching, throttledFetchNextPage])

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="min-h-28">
          <div className="mx-auto max-w-screen-lg py-4">
            <MeetingSearchForm />
            <div className="flex justify-between">
              <Link to="/write">
                <button className="rounded-md bg-sky-500 px-4 py-2 text-white">
                  글쓰기
                </button>
              </Link>
              <select
                className="rounded-md border border-gray-300 px-4 py-2"
                onChange={handleSortChange}
                value={sort}
              >
                <option value="default">기본</option>
                <option value="current">최신순</option>
              </select>
            </div>

            {data?.pages.map((page, i) => (
              <div key={i} className="flex flex-wrap">
                {page.data?.map((post) => (
                  <Post
                    post={post}
                    setShowModal={setShowModal}
                    reportedPostId={reportedPostId}
                    setReportedPostId={setReportedPostId}
                  />
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
          </div>
        </div>
      </div>

      <ReportModal
        showModal={showModal}
        setShowModal={setShowModal}
        reportedPostId={reportedPostId}
        setReportedPostId={setReportedPostId}
      />
    </>
  )
}

export default List
