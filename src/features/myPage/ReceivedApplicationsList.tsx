import { useQuery } from '@tanstack/react-query'
import { getCreatedMeetingIds } from '../../services/apiPost'
import { getMeetingParicipants } from '../../services/apiParticipant'
import { changeParticipantStatus } from '../../services/apiParticipant'
import { Link } from 'react-router-dom'

const ReceivedApplicationsList = () => {
  const { data: meetingIds } = useQuery({
    queryKey: ['createdMeetingIds'],
    queryFn: getCreatedMeetingIds,
  })
  const participantQueries = []
  // const participantQueries =
  //   meetingIds?.map((meetingId) => {
  //     return useQuery({
  //       queryKey: ['meetingParticipants', meetingId],
  //       queryFn: () => getMeetingParicipants(meetingId),
  //     })
  //   })

  const acceptMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'attended')
  }

  const rejectMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'rejected')
  }

  console.log('ids', meetingIds)
  console.log('신청받은내역', participantQueries)

  return (
    <>
      {!participantQueries ? (
        <div>모임 신청 내역이 없습니다</div>
      ) : (
        <div>
          <span>신청받은 내역</span>
          <div className="w-full rounded-md bg-white p-8">
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        모임
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        신청자
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        신청일
                      </th>
                      {/* <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        소개글
                      </th> */}
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        수락/거절
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(participantQueries) &&
                      participantQueries?.map((apply) => (
                        <tr key={apply.participantId}>
                          <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
                            {/* <Link to={`/detail/${apply.meeting.meetingId}`}> */}
                            <div className="ml-3">
                              <p className="whitespace-no-wrap text-gray-900">
                                {/* {apply.meeting.title} */}
                                모임이름
                              </p>
                            </div>
                            {/* </Link> */}
                          </td>

                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {apply.nickname}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {/* {apply.created_at} */}
                              신청일
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {/* {apply.meeting.meeting_date} */}
                              모임날짜
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <button
                              onClick={() =>
                                acceptMeetingApplication(apply.participantId)
                              }
                              className="inline-block rounded-md bg-green-500 px-3 py-1 font-semibold leading-tight text-white transition duration-150 hover:bg-green-600"
                            >
                              수락
                            </button>

                            <button
                              onClick={() =>
                                rejectMeetingApplication(apply.participantId)
                              }
                              className="inline-block rounded-md bg-red-500 px-3 py-1 font-semibold leading-tight text-white transition duration-150 hover:bg-red-600"
                            >
                              거절
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReceivedApplicationsList
