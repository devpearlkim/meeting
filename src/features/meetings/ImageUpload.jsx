import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Button from '../../ui/Button'

const ImageUpload = ({ type }) => {
  const { setValue } = useFormContext()
  const [file, setFile] = useState(null)

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    if (type === 'profile') {
      const fileName = selectedFile.name
      setValue('profileImage', fileName)
    } else {
      setValue('image', selectedFile.name)
    }

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
            <header className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-400 py-12">
              <p className="mb-3 flex flex-wrap justify-center font-semibold text-neutral-400">
                이미지를 드래그 또는 업로드 버튼 클릭
              </p>
              <input
                id="hidden-input"
                type="file"
                className="hidden"
                onChange={(e) => handleFileInputChange(e)}
              />
              <Button
                className="mt-2 rounded bg-cyan-200 px-3 py-1 hover:bg-cyan-400 focus:outline-none"
                onClick={() => document.getElementById('hidden-input').click()}
                text="이미지업로드"
              />
            </header>

            {file && (
              <div className="h-24 w-full pt-8">
                <article className="group cursor-pointer rounded-md bg-neutral-100 focus:outline-none ">
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
                        <Button
                          onClick={handleCancel}
                          text=""
                          className="delete ml-auto rounded-md p-1 text-neutral-400 hover:bg-neutral-300 focus:outline-none"
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
                        </Button>
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
