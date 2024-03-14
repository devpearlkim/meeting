import { FormProvider, useForm } from 'react-hook-form'
import SearchBarInput from './SearchBarInput'
import LimitNumInput from './LimitNumInput'
import LocationInput from './LocationInput'
import CalendarInput from './CalendarInput'
import CategoryInput from './CategoryInput'
import { useLocation, useNavigate } from 'react-router-dom'
import searchGlassImage from '../../assets/images/searchglass.png'
import { useEffect } from 'react'

const MeetingSearchFrom = () => {
  const methods = useForm()
  const { register, handleSubmit, resetField } = methods
  const navigate = useNavigate()
  const location = useLocation()

  const currentCategory = new URLSearchParams(location.search).get('category')

  const onSubmit = (formData) => {
    let queryParams = ''
    if (formData.search && !formData.location) {
      queryParams = `?search=${formData.search}`
    } else if (!formData.search && formData.location) {
      queryParams = `?location=${formData.location}`
    } else if (formData.search && formData.location) {
      queryParams = `?search=${formData.search}&location=${formData.location}`
    }

    let categoryQuery = ''
    if (currentCategory) {
      categoryQuery =
        queryParams !== '' && currentCategory
          ? `&category=${currentCategory}`
          : `?category=${currentCategory}`
    }
    navigate(`/${queryParams}${categoryQuery}`, { state: formData })
    // resetField('search')
    resetField('location')
  }

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [])

  return (
    <div className="flex w-full flex-col gap-2">
      <FormProvider {...methods}>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-fit justify-around rounded-3xl border border-slate-200"
          >
            <div className="flex">
              <SearchBarInput />
              <CalendarInput />
              <LocationInput />
              <LimitNumInput />
            </div>
            <div className="flex items-start pl-5 pr-2 pt-2">
              <button type="submit">
                <img
                  className="w-10"
                  src={searchGlassImage}
                  alt="검색 돋보기 아이콘"
                />
              </button>
            </div>
          </form>
        </div>
        <CategoryInput />
      </FormProvider>
    </div>
  )
}

export default MeetingSearchFrom
