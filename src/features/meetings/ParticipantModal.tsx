import React, { useEffect, useState } from 'react'
import { PiSirenLight } from 'react-icons/pi'

const ParticipantModal = ({
  showParticipantModal,
  setShowParticipantModal,
  meetingId,
}) => {
  const [participantReason, setParticipantReason] = useState('')
  const maxLength = 1000

  const handleSubmit = () => {
    let reason = participantReason
    setShowParticipantModal(false)
    setParticipantReason('')
    console.log('신청이유', reason)
    console.log('신청이유', participantReason)
    console.log('미팅번호', meetingId)
  }

  const handleparticipantReasonChange = (reason) => {
    if (participantReason === reason) {
      setParticipantReason('')
    } else {
      setParticipantReason(reason)
    }
  }

  return (
    <>
      {showParticipantModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            ></span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PiSirenLight />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      간단한 소개글을 입력해주세요
                    </h3>
                    <div className="mt-2">
                      {/* <p className="text-sm text-gray-500">1000자 미만으로 입력해주세요</p> */}
                      <div className="flex w-80 flex-col">
                        <div className="ml-2">
                          <textarea
                            className="h-[40rem] resize-none outline-blue-500"
                            placeholder="간단한 자기소개를 입력해주세요"
                            onChange={(event) => {
                              if (event.target.value.length <= maxLength) {
                                handleparticipantReasonChange(
                                  event.target.value,
                                )
                              }
                            }}
                            maxLength={maxLength}
                          />
                          <span className="text-sm text-gray-500">
                            {maxLength - participantReason.length} characters /
                            {maxLength}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={!participantReason.length}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  제출
                </button>
                <button
                  onClick={() => setShowParticipantModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ParticipantModal
