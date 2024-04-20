import { useNavigate } from 'react-router-dom'
import kakao_login_button from '../../assets/images/kakao_login_button.png'
import ErrorBoundary from '../error/ErrorBoundary'

const KakaoLogin = () => {
  const navigate = useNavigate()
  const handleKakaoLogin = () => {
    const backendURI = import.meta.env.VITE_BACKEND_URI
    const url = `${backendURI}/auth/kakao`
    window.location.href = url
  }

  return (
    <div>
      <button onClick={handleKakaoLogin} type="button">
        <img src={kakao_login_button} alt="카카오 로그인 버튼" />
      </button>
    </div>
  )
}

export default (
  <ErrorBoundary>
    <KakaoLogin />
  </ErrorBoundary>
)
