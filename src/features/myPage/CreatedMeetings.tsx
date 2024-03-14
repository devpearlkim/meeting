import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCreatedMeetings } from '../../services/apiPost'
import Post from '../../features/meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../../features/meetings/ReportModal'

const CreatedMeetings = () => {
  // 추후 useParams로 userId가져와서 해당 유저 정보 조회

  const [showModal, setShowModal] = useState(false)
  const [reportedPostId, setReportedPostId] = useState(null)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => () => setList([]), [])

  const { data, isFetching } = useQuery({
    queryKey: ['meeting_created', page],
    queryFn: getCreatedMeetings,
  })

  useEffect(() => {
    console.log('list', list)
    console.log('개설모임 data', data)
    Array.isArray(data) && setList((prevList) => [...prevList, ...data])
  }, [data])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-yellow-300">
        <div className="min-h-28">
          <div className="mx-auto flex flex-col flex-wrap items-center justify-center py-4">
            <span className="font-semibold">개설한 모임목록</span>
            <div className="flex w-full flex-wrap justify-center gap-8">
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
              <div className="mx-auto mt-4 flex justify-center">
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

export default CreatedMeetings
