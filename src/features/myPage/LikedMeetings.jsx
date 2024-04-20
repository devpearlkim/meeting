import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLikedMeetings } from '../../services/apiPost'
import Post from '../meetings/Post'
import SkeletonPost from '../meetings/SkeletonPost'
import ReportModal from '../meetings/ReportModal'
import Button from '../../ui/Button'

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
            <div className="flex flex-wrap justify-between gap-8">
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

export default LikedMeetings
