import axios from 'axios'

export async function getMeetingParicipants(meetingId) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(
      `${backendURI}/meetings/${meetingId}/participants`,
    )

    return response.data
  } catch (error) {
    throw new Error('미팅의 참가자목록 가져오는 중 오류발생')
  }
}

export async function getMeetingsParicipants(meetingId) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(
      `${backendURI}/meetings/${meetingId}/participants`,
    )

    return response.data.data
  } catch (error) {
    throw new Error('미팅의 참가자목록 가져오는 중 오류발생')
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
