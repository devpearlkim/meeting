import { FormProvider, useForm } from 'react-hook-form'
import SearchBarInput from './SearchBarInput'
import LimitNumInput from './LimitNumInput'
import LocationInput from './LocationInput'
import CalendarInput from './CalendarInput'
import CategoryInput from './CategoryInput'
import { useLocation, useNavigate } from 'react-router-dom'
import searchGlassImage from '../../assets/images/searchglass.png'

const MeetingSearchFrom = () => {
  const methods = useForm()
  const { register, handleSubmit, resetField } = methods
  const navigate = useNavigate()
  const location = useLocation()

  const currentCategory = new URLSearchParams(location.search).get('category')

  const onSubmit = (formData) => {
    const queryParams = `?search=${formData.search}&location=${formData.location}`
    console.log(formData)
    // navigate('/searchList', { state: formData });
    // 현재 카테고리를 유지하면서 새로운 검색어를 추가합니다.
    const categoryQuery = currentCategory ? `&category=${currentCategory}` : ''

    navigate(`/list${queryParams}${categoryQuery}`, { state: formData })
    // reset()
  }

  return (
    <div className="w-fit">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-around rounded-3xl border-2 border-slate-200"
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
      </FormProvider>
      <CategoryInput />
    </div>
  )
}

export default MeetingSearchFrom
