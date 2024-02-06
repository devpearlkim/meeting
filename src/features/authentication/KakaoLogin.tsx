import { useNavigate } from 'react-router-dom'
import kakao_login_button from '../../assets/images/kakao_login_button.png'

const KakaoLogin = () => {
  const navigate = useNavigate()

  const handleKakaoLogin = () => {
    const url = ''
    navigate(url)
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
