import { Link, useLocation } from 'react-router-dom'
import MeetingSearchForm from '../features/meetings/MeetingSearchForm'
import { Fragment, useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getPost } from '../services/apiPost.js'
import { throttle } from 'lodash'
import Post from '../features/meetings/Post.js'
import SkeletonPost from '../features/meetings/SkeletonPost .js'
import { PiSirenLight } from 'react-icons/pi'

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
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
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
    if (inView) {
      throttledFetchNextPage()
    }
  }, [inView])

  const [showTextarea, setShowTextarea] = useState(false)
  const [reportReason, setReportReason] = useState('')

  const handleReportReasonChange = (reason) => {
    if (reportReason === reason) {
      setReportReason('')
    } else {
      setReportReason(reason)
    }
  }

  const handleReport = () => {
    let reason = reportReason
    setShowModal(false)
    setReportedPostId(null)
    setReportReason('')
  }

  const handleCustomReason = () => {
    setShowTextarea((prev) => !prev)
    setReportReason('')
  }

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
              <div key={i} className="flex flex-wrap justify-between gap-2">
                {page.map((post) => (
                  // <Link to={`/detail/${post.id}`} key={post.id}>
                  <Post
                    post={post}
                    setShowModal={setShowModal}
                    setReportedPostId={setReportedPostId}
                  />
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
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            ></span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PiSirenLight />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      신고 사유를 선택해주세요
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        허위신고는 제제 받을 수 있습니다
                      </p>
                      <div className="flex w-80 flex-col">
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'spam' ? 'bg-green-200' : ''}`}
                          onClick={() => handleReportReasonChange('spam')}
                        >
                          스팸
                        </button>
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'inappropriate' ? 'bg-green-200' : ''}`}
                          onClick={() =>
                            handleReportReasonChange('inappropriate')
                          }
                        >
                          부적절한 컨텐츠
                        </button>
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'abusive' ? 'bg-green-200' : ''}`}
                          onClick={() => handleReportReasonChange('abusive')}
                        >
                          욕설 및 비방
                        </button>

                        <div className="ml-2">
                          <button onClick={handleCustomReason}>직접입력</button>
                          <div>
                            {showTextarea && (
                              <textarea
                                className="w-80 resize-none outline-blue-500"
                                placeholder="신고 사유를 입력해주세요"
                                onChange={(event) =>
                                  handleReportReasonChange(event.target.value)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleReport}
                  type="button"
                  disabled={!reportReason.length}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default List
