import { useQuery } from '@tanstack/react-query'
import { getCreatedMeetingIds } from '../../services/apiPost'
import { getMeetingsParicipants } from '../../services/apiParticipant'
import { changeParticipantStatus } from '../../services/apiParticipant'
import { Link } from 'react-router-dom'

const ReceivedApplicationsList = () => {
  const { data: meetingIds } = useQuery({
    queryKey: ['createdMeetingIds'],
    queryFn: getCreatedMeetingIds,
  })

  const { data: receivedApplications } = useQuery({
    queryKey: ['receivedApplications', meetingIds],
    queryFn: getMeetingsParicipants,
  })

  // const participantQueries = meetingIds?.map((meetingId) => {
  //   return useQuery({
  //     queryKey: ['meetingParticipants', meetingId],
  //     queryFn: () => getMeetingParicipants(meetingId),
  //   })
  // })

  const acceptMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'attended')
  }

  const rejectMeetingApplication = async (participantId) => {
    await changeParticipantStatus(participantId, 'rejected')
  }

  console.log('ids', meetingIds)
  console.log('receivedApplications', receivedApplications)

  return <>...</>
}

export default ReceivedApplicationsList
