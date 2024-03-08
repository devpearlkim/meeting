import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const ImageUpload = ({ type }) => {
  const { setValue } = useFormContext()
  const [file, setFile] = useState(null)

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    type === 'profile'
      ? setValue('profileImage', selectedFile.name)
      : setValue('image', selectedFile.name)

    e.target.value = null
  }

  const handleCancel = () => {
    setFile(null)
  }

  return (
    <div className="">
      <main className="">
        <article className="relative flex h-full flex-col rounded-md bg-white">
          <section className="flex flex-col">
            <header className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12">
              <p className="mb-3 flex flex-wrap justify-center font-semibold text-gray-900">
                여기 이미지를 드래그 또는 업로드 버튼 클릭
              </p>
              <input
                id="hidden-input"
                type="file"
                className="hidden"
                onChange={(e) => handleFileInputChange(e)}
              />
              <button
                id="button"
                type="button"
                className="mt-2 rounded-sm bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
                onClick={() => document.getElementById('hidden-input').click()}
              >
                이미지업로드
              </button>
            </header>

            {file && (
              <div className="h-24 w-full pt-8">
                <article className="group cursor-pointer rounded-md bg-gray-100 focus:outline-none ">
                  <div className="flex flex-col">
                    <img
                      alt="upload preview"
                      className="h-40 rounded-md bg-fixed object-cover"
                      src={URL.createObjectURL(file)}
                    />
                    <section className="flex flex-col break-words rounded-md px-3 py-2 text-xs">
                      <h1 className="flex-1 group-hover:text-blue-800">
                        {file.name}
                      </h1>
                      <div className="flex">
                        <button
                          type="button"
                          className="delete ml-auto rounded-md p-1 text-gray-800 hover:bg-gray-300 focus:outline-none"
                          onClick={handleCancel}
                        >
                          <svg
                            className="pointer-events-none ml-auto h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="pointer-events-none"
                              d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                            />
                          </svg>
                        </button>
                      </div>
                    </section>
                  </div>
                </article>
              </div>
            )}
          </section>
        </article>
      </main>
    </div>
  )
}

export default ImageUpload
