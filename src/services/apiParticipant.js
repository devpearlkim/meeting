import axios from 'axios'

export async function getMeetingParicipants(meetingId) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.get(
      `${backendURI}/meetings/${meetingId}/participants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error('미팅의 참가자목록 가져오는 중 오류발생')
  }
}

export async function getMeetingsParicipants({ queryKey }) {
  const participantsIds = queryKey[1]
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const responses = await Promise.all(
      participantsIds.map(async (meetingId) => {
        const response = await axios.get(
          `${backendURI}/meetings/${meetingId}/participants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        return response.data.data
      }),
    )
    const flattenedResponses = responses.flat()

    return flattenedResponses
  } catch (error) {
    throw new Error('내가 개설한 미팅들의 참가자목록 가져오는 중 오류발생')
  }
}

export async function addParticipant({ meetingId, description }) {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.post(
      `${backendURI}/participants`,
      {
        meetingId,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error('미팅의 참가자목록 추가하는 중 오류발생')
  }
}

export async function changeParticipantStatus(participantId, status) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.put(
      `${backendURI}/participants/${participantId}`,
      {
        status,
      },
    )
    return response.data
  } catch (error) {
    throw new Error('참가상태 변경 중 오류발생')
  }
}
