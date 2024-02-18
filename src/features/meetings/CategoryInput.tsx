import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const CategoryInput = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentCategories = new URLSearchParams(location.search).getAll(
    'category',
  )
  const [selectedCategories, setSelectedCategories] = useState(
    currentCategories[0]?.split('%') ?? [],
  )

  useEffect(() => {
    setSelectedCategories(currentCategories[0]?.split('%') ?? [])
  }, [location.search])

  const handleCategoryClick = (categoryId) => {
    let updatedCategories = [...selectedCategories]
    const index = updatedCategories.indexOf(categoryId.toString())

    if (index !== -1) {
      updatedCategories.splice(index, 1)
    } else {
      updatedCategories.push(categoryId.toString())
    }

    const newSearch = updatedCategories
      .map((category) => encodeURIComponent(category))
      .join('%')

    const searchParams = new URLSearchParams(location.search)

    if (updatedCategories.length) {
      searchParams.set('category', newSearch)
    } else {
      searchParams.delete('category')
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    })
  }

  const categories = [
    { id: '1', name: '카테고리 1' },
    { id: '2', name: '카테고리 2' },
    { id: '3', name: '카테고리 3' },
    { id: '11', name: '카테고리 1' },
    { id: '21', name: '카테고리 2' },
    { id: '31', name: '카테고리 3' },
  ]

  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`my-2 inline-block flex-shrink-0 rounded-full px-3 py-2 text-sm ${
            selectedCategories.includes(category.id)
              ? 'bg-blue-500 text-white'
              : 'border border-blue-500 bg-white text-blue-500 hover:bg-blue-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryInput
