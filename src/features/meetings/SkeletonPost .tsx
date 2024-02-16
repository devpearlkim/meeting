import React from 'react'

const SkeletonPost = () => {
  return (
    <div className="flex w-[320px] animate-pulse flex-col overflow-hidden rounded-lg bg-white shadow">
      <div className="h-52 w-full bg-gray-300"></div>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="block text-sm font-semibold text-gray-400">
            Loading...
          </div>
        </div>
        <div className="mb-2 h-4 w-2/3 bg-gray-300"></div>
        <div className="h-4 w-1/2 bg-gray-300"></div>
        <div className="mt-auto flex justify-between gap-4 border-t border-gray-300 pt-4">
          <div className="h-4 w-1/4 bg-gray-300"></div>
          <div className="h-4 w-1/4 bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonPost
