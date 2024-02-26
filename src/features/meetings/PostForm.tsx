import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PostDatePicker from './PostDatePicker'
import LocationInput from './LocationInput'
import CountInput from './CountInput'
import CategoryInput from './CategoryInput'
import ImageUpload from './ImageUpload'
import { addPost } from '../../services/apiPost'

const PostForm = () => {
  const methods = useForm()

  const onSubmit = (data) => {
    if (!data.title) {
      toast.error('제목을 작성해주세요')
      return
    }
    if (!data.description) {
      toast.error('내용을 작성해주세요')
      return
    }
    if (!data.date) {
      toast.error('날짜를 입력해주세요')
      return
    }
    if (!data.location) {
      toast.error('지역을 입력해주세요')
      return
    }
    if (data.count < 2) {
      toast.error('모집인원은 최소 2명입니다')
      return
    }
    if (data.count > 50) {
      toast.error('모집인원은 최대 50명입니다')
      return
    }
    addPost(data)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...methods.register('title')}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            내용
          </label>
          <textarea
            id="description"
            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            {...methods.register('description')}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            모임날짜
          </label>
          <PostDatePicker />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            위치
          </label>
          <LocationInput style="post" />
        </div>
        <div className="mb-4">
          <label
            htmlFor="count"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            모집인원
          </label>
          <CountInput />
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            카테고리
          </label>
          <CategoryInput mode={'post'} />
        </div>
        <div>
          <label
            htmlFor="image"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            메인이미지
          </label>
          <ImageUpload />
        </div>
        <div>
          <button
            type="submit"
            className="my-4 mt-40 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default PostForm
