import React from 'react'
import { Link } from 'react-router-dom'
import { PiSirenLight } from 'react-icons/pi'

const Post = ({ post, setShowModal, setReportedPostId }) => {
  const handleReportClick = (postId) => {
    setReportedPostId(post.id) // postId 설정
    setShowModal(true) // 모달 열기
  }

  return (
    <div>
      <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
        <Link to={`/detail/${post.id}`} key={post.id}>
          {/* <div> */}
          <img
            src="https://loremflickr.com/320/240?random=1"
            className="h-52 w-full object-cover"
            alt="메인이미지"
          />
          <div className="flex flex-1 flex-col p-3">
            <div className="flex justify-between">
              {/* <Link to={`/profile/${post.writerId}`}> */}
              <div className="flex gap-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://loremflickr.com/320/240?random=2"
                  alt="프로필이미지"
                />
                <span className="block text-sm font-semibold text-slate-400">
                  닉네임
                </span>
              </div>
              {/* </Link> */}
              <span className="block text-sm font-semibold text-slate-400">
                2024-03-01
              </span>
            </div>
            <h3 className="mb-2 mt-3 text-lg font-bold">
              타이베이 같이 딤섬집 가요
            </h3>
            <div className="my-2">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                    맛집
                  </button>
                  <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                    맛집
                  </button>
                  <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                    맛집
                  </button>
                  <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                    맛집
                  </button>
                  ...
                </div>
                <div>1/10</div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-300 px-2 pb-2 pt-4">
          <button>좋아요</button>
          <button onClick={handleReportClick}>
            <PiSirenLight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
