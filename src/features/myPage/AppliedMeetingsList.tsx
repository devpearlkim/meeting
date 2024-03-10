import { useQuery } from '@tanstack/react-query'
import { getAppliedMeetings } from '../../services/apiUser'
import { useState } from 'react'

const AppliedMeetingsList = () => {
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['appliedMeetings', page],
    queryFn: getAppliedMeetings,
  })

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <>
      {!data ? (
        <div>모임 신청 내역이 없습니다</div>
      ) : (
      
          <div>
            <span>신청내역</span>
            <div className="w-full rounded-md bg-white p-8">
              <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                          모임이름
                        </th>
                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                          신청일
                        </th>
                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                          모임날짜
                        </th>
                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((apply) => (
                        <tr key={apply.participantId}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="ml-3">
                              <p className="whitespace-no-wrap text-gray-900">
                                {apply.meeting.title}
                              </p>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {apply.created_at}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {apply.meeting.meeting_date}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span
                              className={`relative inline-block px-3 py-1 font-semibold text-${apply.status === 'pending' ? 'green' : apply.status === 'rejected' ? 'orange' : 'red'}-900 leading-tight`}
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                              ></span>
                              <span className="relative">{apply.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5">
                    <div className="xs:mt-0 mt-2 inline-flex">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="rounded-l bg-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-50 transition duration-150 hover:bg-indigo-500"
                      >
                        Prev
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={data?.length < 5}
                        className="rounded-r bg-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-50 transition duration-150 hover:bg-indigo-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default AppliedMeetingsList