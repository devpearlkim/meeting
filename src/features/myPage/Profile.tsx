import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../../services/apiUser'

const Profile = () => {
  const { userId } = useParams()

  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn: getUserProfile,
  })

  console.log('프로필정보', data)

  const editProfile = () => {
    console.log('프로필 수정 버튼 클릭')
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img
          className="h-40 w-40 rounded-full"
          src={data?.profileImage}
          alt="프로필이미지"
        />
        <span className="block text-lg font-semibold">{data?.nickname}</span>
      </div>
      <div className="flex gap-1">
        {data?.categories.map((category) => (
          <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
            {category.name}
          </button>
        ))}
      </div>
      <button onClick={editProfile}>프로필 수정</button>
    </div>
  )
}

export default Profile
