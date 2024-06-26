import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserProfile } from '../../services/apiUser'
import defaultProfileImage from '../../assets/images/defaultProfileImage.png'

const Profile = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const { userId } = useParams()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn: getUserProfile,
  })

  const editProfile = () => {
    navigate(`/editProfile`)
  }

  return (
    <div className="ml-8 flex w-64 flex-col gap-2 p-4">
      <div className="flex flex-col gap-2">
        <img
          className="h-40 w-40 rounded-full"
          src={data?.profileImage || defaultProfileImage}
          alt="프로필이미지"
          onError={(e) => {
            e.target.src = defaultProfileImage
          }}
        />
        <span className="block pl-4 font-semibold">{data?.nickname}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {data?.categories.map((category) => (
          <button className="inline-block rounded-full bg-sky-500 px-3 py-1 text-xs text-white">
            {category.name}
          </button>
        ))}
      </div>
      {userInfo?.userId == userId && (
        <button
          className="w-full rounded bg-cyan-400 px-2 py-3 font-bold text-white outline-none hover:bg-cyan-500 active:bg-cyan-500"
          onClick={editProfile}
        >
          프로필 수정
        </button>
      )}
    </div>
  )
}

export default Profile
