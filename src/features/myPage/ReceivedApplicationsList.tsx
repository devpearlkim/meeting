import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { getCreatedMeetingIds } from '../../services/apiPost'
import { getMeetingsParicipants } from '../../services/apiParticipant'
import { changeParticipantStatus } from '../../services/apiParticipant'
import { useEffect, useState } from 'react'

const ReceivedApplicationsList = ({ meetingId }) => {
  // const { data: meetingIds } = useQuery({
  //   queryKey: ['createdMeetingIds'],
  //   queryFn: getCreatedMeetingIds,
  // })

  const { data: receivedApplications } = useQuery({
    queryKey: ['receivedApplications', meetingId],
    queryFn: getMeetingsParicipants,
  })
  // const { data: receivedApplications } = useQuery({
  //   queryKey: ['receivedApplications', meetingId],
  //   queryFn: getMeetingsParicipants,
  // })

  console.log('미팅아이디', meetingId)

  const [pendingList, setPendingList] = useState([])

  useEffect(() => {
    setPendingList(
      receivedApplications?.filter(
        (application) => application.status === 'pending',
      ),
    )
  }, [receivedApplications])

  const queryClient = useQueryClient()

  const acceptMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'attended')
    queryClient.invalidateQueries({
      queryKey: ['receivedApplications'],
    })
    queryClient.invalidateQueries({
      queryKey: ['postDetail'],
    })
  }

  const rejectMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'rejected')
    queryClient.invalidateQueries({
      queryKey: ['receivedApplications'],
    })
    queryClient.invalidateQueries({
      queryKey: ['postDetail'],
    })
  }

  console.log('receivedApplications', receivedApplications)

  return (
    <div className="w-full rounded-md bg-white py-8">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                신청자
              </th>
              <th className="w-[45rem] justify-center border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold text-gray-600">
                소개글
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-600">
                수락/거절
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingList?.length === 0 ? (
              <p className="text-center font-semibold text-gray-600">
                신청내역이 없습니다
              </p>
            ) : (
              pendingList?.map((apply) => (
                <tr key={apply.participantid}>
                  <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
                    {/* <Link to={`/profile/${apply.유저의아이디부분}`}> */}
                    <div className="ml-3">
                      <p className="whitespace-no-wrap text-gray-900">
                        {apply.nickname}
                      </p>
                    </div>
                    {/* </Link> */}
                  </td>

                  <td className="w-72 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      {apply.description}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <button
                      onClick={() =>
                        acceptMeetingApplication(apply.participantid)
                      }
                      className="mr-4 inline-block rounded-md bg-green-500 px-3 py-1 font-semibold leading-tight text-white transition duration-150 hover:bg-green-600"
                    >
                      수락
                    </button>

                    <button
                      onClick={() =>
                        rejectMeetingApplication(apply.participantid)
                      }
                      className="inline-block rounded-md bg-red-500 px-3 py-1 font-semibold leading-tight text-white transition duration-150 hover:bg-red-600"
                    >
                      거절
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReceivedApplicationsList
