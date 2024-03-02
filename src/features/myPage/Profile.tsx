const Profile = () => {
  const userInfo = sessionStorage.getItem('userInfo')
  console.log(userInfo)

  return <div className="bg-pink">프로필이미지랑자기소개</div>
}

export default Profile
