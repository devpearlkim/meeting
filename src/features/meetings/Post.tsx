import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false) // 모달 상태 추가

  const handleReport = () => {
    // 여기에 포스트 신고 관련 로직을 추가할 수 있습니다.
    setShowModal(false) // 모달 닫기
  }
  return (
    <div>
      <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
        <Link to={`/detail/${post.id}`} key={post.id}>
          <div>
            <img
              src="https://loremflickr.com/320/240?random=1"
              className="h-52 w-full object-cover"
              alt="메인이미지"
            />
            <div className="flex flex-1 flex-col p-3">
              <div className="flex justify-between">
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
          </div>
        </Link>
        <div className="mt-auto flex justify-between gap-4 border-t border-slate-300 pt-4">
          <button>좋아요</button>
          <button onClick={() => setShowModal(true)}>신고</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>포스트 신고</h2>
            <p>포스트를 신고합니다.</p>
            <button onClick={() => setShowModal(false)}>취소</button>
            <button onClick={handleReport}>신고</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
