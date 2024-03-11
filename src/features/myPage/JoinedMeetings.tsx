import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getJoinedMeetings } from '../../services/apiPost'
import Post from '../../features/meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../../features/meetings/ReportModal'

const JoinedMeetings = () => {
  // 추후 useParams로 userId가져와서 해당 유저 정보 조회

  const [showModal, setShowModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState(null)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => () => setList([]), [])

  const { data, isFetching } = useQuery({
    queryKey: ['meeting_joined', page],
    queryFn: getJoinedMeetings,
  })

  useEffect(() => {
    Array.isArray(data) && setList((prevList) => [...prevList, ...data])
  }, [data])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="min-h-28">
          <div className="mx-auto py-4">
            <span className="text-semibold">참여중인 모임목록</span>
            <div className="flex flex-wrap justify-center gap-8">
              {list.map((post) => (
                <Post
                  key={post.meetingId}
                  post={post}
                  setShowModal={setShowModal}
                  reportedPostId={reportedPostId}
                  setReportedPostId={setReportedPostId}
                />
              ))}
            </div>

            {isFetching && Array.isArray(data) && data.length === 6 && (
              <div className="flex flex-wrap justify-between gap-8">
                {[...Array(6)].map((_, i) => (
                  <SkeletonPost key={i} />
                ))}
              </div>
            )}
            {Array.isArray(data) && data.length === 6 && (
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
