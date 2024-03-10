import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCreatedMeetingIds } from '../../services/apiPost'
import { getMeetingParicipants } from '../../services/apiParticipant'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ReceivedApplicationsList = () => {
  const [page, setPage] = useState(1)

  const { data: meetingIds } = useQuery({
    queryKey: ['createdMeetingIds'],
    queryFn: getCreatedMeetingIds,
  })

  const participantQueries = meetingIds?.map((meetingId) => {
    return useQuery({
      queryKey: ['meetingParticipants', meetingId],
      queryFn: () => getMeetingParicipants(meetingId),
    })
  })

  console.log('신청받은내역', participantQueries)
  // console.log()

  return <div>신청받은내역</div>
}

export default ReceivedApplicationsList
