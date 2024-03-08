import { Link, useLocation } from 'react-router-dom'
import MeetingSearchForm from '../../features/meetings/MeetingSearchForm'
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getJoinedMeetings } from '../../services/apiPost'
import Post from '../../features/meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../../features/meetings/ReportModal'

const JoinedMeetings = () => {
  const [searchFormValues, setSearchFormValues] = useState({})
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category') ?? []
  const search = queryParams.get('search') || ''
  const locationParam = queryParams.get('location') || ''
  const [showModal, setShowModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState(null)
  const [page, setPage] = useState(0)

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getJoinedMeetings,
    getNextPageParam: (lastPage) => lastPage?.data?.length,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  const handleLoadMore = () => {
    fetchNextPage()
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="min-h-28">
          <div className="mx-auto max-w-screen-lg py-4">
            {data?.pages.map((pageData, pageIndex) => (
              <div
                key={pageIndex}
                className="flex flex-wrap justify-between gap-2"
              >
                {Array.isArray(pageData) &&
                  pageData?.map((post) => (
                    <Post
                      key={post.id}
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
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="rounded-md bg-purple-500 px-4 py-2 text-white disabled:opacity-50"
                >
                  {isFetching ? '로딩 중...' : '더보기'}
                </button>
              </div>
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

export default JoinedMeetings
