import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLikedMeetings } from '../../services/apiPost'
import Post from '../../features/meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../../features/meetings/ReportModal'

const LikedMeetings = () => {
  const [showModal, setShowModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState(null)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => () => setList([]), [])

  const { data, isFetching } = useQuery({
    queryKey: ['posts_liked', page],
    queryFn: getLikedMeetings,
  })

  console.log('좋아요모임조회', list)
  useEffect(() => {
    Array.isArray(data) && setList((prevList) => [...prevList, ...data])
  }, [data])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <span>좋아요한 모임목록</span>
        <div className="min-h-28">
          <div className="mx-auto max-w-screen-lg py-4">
            <div className="flex flex-wrap justify-between gap-2">
              {list.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  setShowModal={setShowModal}
                  reportedPostId={reportedPostId}
                  setReportedPostId={setReportedPostId}
                />
              ))}
            </div>

            {isFetching && Array.isArray(data) && data.length === 8 && (
              <div className="flex flex-wrap justify-between gap-2">
                {[...Array(8)].map((_, i) => (
                  <SkeletonPost key={i} />
                ))}
              </div>
            )}
            {Array.isArray(data) && data.length >= 8 && (
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

export default LikedMeetings