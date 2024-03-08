const Profile = () => {
  const userInfo = sessionStorage.getItem('userInfo')
  console.log(JSON.stringify(userInfo))

  return (
    <div className="bg-pink">
      프로필이미지, 관심카테고리보여주기, 프로필 수정버튼(회원가입폼으로 이동후
      patch요청 일반회원시만 비번변경)
    </div>
  )
}

export default Profile
