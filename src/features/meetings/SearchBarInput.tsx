import { useFormContext } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

const SearchBarInput = () => {
  const { register } = useFormContext()
  const searchParams = new URLSearchParams(useLocation().search)
  // const initialSearch = searchParams.get('search') ?? ''

  return (
    <div className="">
      <input
        type="text"
        {...register('search')}
        placeholder="키워드입력"
        className="w-80 rounded-l-3xl border-r p-4 font-semibold outline-none hover:rounded-3xl hover:bg-slate-200"
      />
    </div>
  )
}

export default SearchBarInput
