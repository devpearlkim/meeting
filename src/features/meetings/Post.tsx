const Post = ({ post }) => {
  return (
    <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
      <img
        src="https://loremflickr.com/320/240?random=1"
        className="h-52 w-full object-cover"
        alt="메인이미지"
      />
      <div className="flex flex-1 flex-col p-3">
        <div className="flex justify-between">
          <img
            className="h-10 w-10 rounded-full"
            src="https://loremflickr.com/320/240?random=2"
            alt="프로필이미지"
          />
          <span className="block text-sm font-semibold text-slate-400">
            2024-03-01
          </span>
        </div>
        <h3 className="mb-2 mt-3 text-lg font-bold">
          타이베이 같이 딤섬집 가요
        </h3>
        {/* <h2 className="mb-3 text-xs text-slate-400">#맛집</h2> */}
        <div className="my-2">
          <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
            #수다
          </button>
        </div>
        <div className="mt-auto flex justify-between gap-4 border-t border-slate-300 pt-4">
          <button>좋아요</button>
          <button>신고</button>
        </div>
      </div>
    </div>
  )
}

export default Post
