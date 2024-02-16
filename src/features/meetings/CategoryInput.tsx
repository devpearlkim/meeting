import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const CategoryInput = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentCategory = new URLSearchParams(location.search).get('category')
  const [selectedCategory, setSelectedCategory] = useState(currentCategory)
  const handleCategoryClick = (category) => {
    // 클릭한 카테고리가 이미 현재 URL의 쿼리 매개변수로 설정되어 있는지 확인합니다.
    if (selectedCategory === category) {
      // 현재 URL의 쿼리 매개변수에서 클릭한 카테고리를 제거합니다.
      const newSearch = new URLSearchParams(location.search)
      newSearch.delete('category')

      // 새로운 URL로 이동합니다.
      navigate({
        pathname: location.pathname,
        search: newSearch.toString(),
      })

      // 선택된 카테고리 상태를 업데이트합니다.
      setSelectedCategory(null)
    } else {
      // 클릭한 카테고리를 현재 URL의 쿼리 매개변수로 설정합니다.
      const newSearch = new URLSearchParams(location.search)
      newSearch.set('category', category)

      // 새로운 URL로 이동합니다.
      navigate({
        pathname: location.pathname,
        search: newSearch.toString(),
      })

      // 선택된 카테고리 상태를 업데이트합니다.
      setSelectedCategory(category)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleCategoryClick('맛집')}
        className={`my-2 inline-block rounded-full bg-blue-500 px-3 py-2 text-sm text-white ${selectedCategory === '맛집' ? 'selected' : ''}`}
      >
        맛집
      </button>
      <button
        onClick={() => handleCategoryClick('맛집')}
        className={`my-2 inline-block rounded-full bg-blue-500 px-3 py-2 text-sm text-white ${selectedCategory === '맛집' ? 'selected' : ''}`}
      >
        맛집
      </button>
      <button
        onClick={() => handleCategoryClick('맛집')}
        className={`my-2 inline-block rounded-full bg-blue-500 px-3 py-2 text-sm text-white ${selectedCategory === '맛집' ? 'selected' : ''}`}
      >
        맛집
      </button>
    </div>
  )
}

export default CategoryInput
