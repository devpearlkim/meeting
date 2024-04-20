import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getJoinedMeetings } from '../../services/apiPost'
import Post from '../meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../meetings/ReportModal'
import Button from '../../ui/Button'

const JoinedMeetings = () => {
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
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="min-h-28">
          <div className="mx-auto flex flex-col flex-wrap items-center justify-center py-4">
            <span className="font-semibold">참여중인 모임목록</span>
            <div className="flex w-full flex-wrap justify-between gap-8">
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
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  text={isFetching ? '로딩 중...' : '더보기'}
                />
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
