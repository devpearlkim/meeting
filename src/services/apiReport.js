import axios from 'axios'

export async function reportMeeting({ meeting }) {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const { meetingId, content } = meeting
  try {
    const response = await axios.post(
      `${backendURI}/reports/meetings`,
      {
        meetingId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error('모임 신고 중 오류발생')
  }
}

export async function report() {}
