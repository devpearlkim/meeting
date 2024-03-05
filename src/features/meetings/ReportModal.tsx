import React, { useEffect, useState } from 'react'
import { PiSirenLight } from 'react-icons/pi'
import { reportMeeting } from '../../services/apiReport'

const ReportModal = ({
  showModal,
  setShowModal,
  reportedPostId,
  setReportedPostId,
}) => {
  const [reportReason, setReportReason] = useState('')
  const [showTextarea, setShowTextarea] = useState(false)

  const handleReport = () => {
    reportMeeting({ meetingId: reportedPostId, content: reportReason })

    let reason = reportReason
    setShowModal(false)
    setReportedPostId(null)
    setReportReason('')
  }

  const handleReportReasonChange = (reason) => {
    if (reportReason === reason) {
      setReportReason('')
    } else {
      setReportReason(reason)
    }
  }

  const handleCustomReason = () => {
    setShowTextarea((prev) => !prev)
    setReportReason('')
  }

  console.log(reportedPostId)
  return (
    <>
      {showModal && (
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
                      신고 사유를 선택해주세요
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        허위신고는 제제 받을 수 있습니다
                      </p>
                      <div className="flex w-80 flex-col">
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'spam' ? 'bg-green-200' : ''}`}
                          onClick={() => handleReportReasonChange('spam')}
                        >
                          스팸
                        </button>
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'inappropriate' ? 'bg-green-200' : ''}`}
                          onClick={() =>
                            handleReportReasonChange('inappropriate')
                          }
                        >
                          부적절한 컨텐츠
                        </button>
                        <button
                          className={`ml-2 w-full text-left ${reportReason === 'abusive' ? 'bg-green-200' : ''}`}
                          onClick={() => handleReportReasonChange('abusive')}
                        >
                          욕설 및 비방
                        </button>

                        <div className="ml-2">
                          <button onClick={handleCustomReason}>직접입력</button>
                          <div>
                            {showTextarea && (
                              <textarea
                                className="w-80 resize-none outline-blue-500"
                                placeholder="신고 사유를 입력해주세요"
                                onChange={(event) =>
                                  handleReportReasonChange(event.target.value)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleReport}
                  type="button"
                  disabled={!reportReason.length}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  신고
                </button>
                <button
                  onClick={() => setShowModal(false)}
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

export default ReportModal
