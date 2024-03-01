import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import kakao_login_button from '../../assets/images/kakao_login_button.png'

const KakaoLogin = () => {
  const navigate = useNavigate()

  const handleKakaoLogin = async () => {
    try {
      const backendURI = import.meta.env.VITE_BACKEND_URI
      const response = await axios.get(`${backendURI}/auth/kakao`)

      console.log(response)
      const token = response.headers.authorization

      if (token) {
        console.log('토큰:', token)
      } else {
        console.error('토큰이 없습니다.')
      }
    } catch (error) {
      console.error('에러:', error)
    }
  }

  return (
    <div>
      <button onClick={handleKakaoLogin} type="button">
        <img src={kakao_login_button} alt="카카오 로그인 버튼" />
      </button>
    </div>
  )
}

export default KakaoLogin
