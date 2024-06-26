import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCategories } from '../../services/apiPost'

const CategoryInput = ({ mode, default_categories }) => {
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

  useEffect(() => {
    if (default_categories) {
      const defaultCategoryIds = default_categories.map((category) =>
        category.categoryId.toString(),
      )
      setSelectedCategories([...defaultCategoryIds])
      setValue('categories', [...defaultCategoryIds])
    }
  }, [default_categories])

  const { setValue } = useFormContext()

  const handleCategoryClick = (categoryId) => {
    let updatedCategories = [...selectedCategories]
    const index = updatedCategories.indexOf(categoryId.toString())

    if (index !== -1) {
      updatedCategories.splice(index, 1)
    } else {
      updatedCategories.push(categoryId.toString())
    }

    if (mode === 'post') {
      const newCategories = updatedCategories
      setSelectedCategories(updatedCategories)
      setValue('categories', newCategories)
      return
    }

    if (mode === 'signup') {
      const newCategories = updatedCategories
      setSelectedCategories(updatedCategories)
      setValue(
        'categoryIds',
        newCategories.map((item) => parseInt(item)),
      )
      return
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

  const { data: category, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const categories = category?.data

  return (
    <div
      className={`flex gap-2 ${mode === 'post' || mode === 'signup' ? 'flex-wrap' : 'overflow-x-auto'}`}
    >
      {!isLoading &&
        Array.isArray(categories) &&
        categories.map((category) => (
          <button
            key={category.categoryId}
            onClick={() => handleCategoryClick(category.categoryId)}
            type="button"
            className={`inline-block flex-shrink-0 rounded-full px-3 py-2 text-sm ${
              selectedCategories.includes(category.categoryId.toString())
                ? 'bg-sky-500 text-white'
                : 'border border-sky-500 bg-white text-sky-500 hover:bg-slate-50'
            }`}
          >
            {category.name}
          </button>
        ))}
    </div>
  )
}

export default CategoryInput
