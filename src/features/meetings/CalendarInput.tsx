import { useState, useEffect, useRef } from 'react'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import { ko } from 'date-fns/locale'

export default function CalendarInput() {
  const [selectedRange, setSelectedRange] = useState()
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef(null)
  const { setValue } = useFormContext()

  const disabledDays = {
    before: new Date(),
  }

  const handleInputChange = () => {
    setShowCalendar(true)
  }

  const handleDayClick = (range) => {
    setSelectedRange(range)
    setValue('from', format(range.from, 'yyyy-MM-dd'))
    setValue('to', format(range.to || range.from, 'yyyy-MM-dd'))
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={calendarRef} className="">
      <div className="flex justify-center">
        <div>
          <IconButton disabled>
            <CalendarToday />
          </IconButton>
          <input
            className="border-r-2 py-4 font-bold outline-none"
            size={10}
            placeholder="시작기간"
            value={
              selectedRange ? format(selectedRange.from, 'yyyy-MM-dd') : ''
            }
            onFocus={() => handleInputChange(true)}
            readOnly
          />
        </div>
        <div className="pl-2">
          <IconButton disabled>
            <CalendarToday />
          </IconButton>
          <input
            className="py-4 font-bold outline-none"
            size={10}
            placeholder="마지막기간"
            value={
              selectedRange
                ? format(selectedRange.to || selectedRange.from, 'yyyy-MM-dd')
                : ''
            }
            onFocus={() => handleInputChange(false)}
            readOnly
          />
        </div>
      </div>
      {showCalendar && (
        <div>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleDayClick}
            disabled={disabledDays}
            locale={ko}
          />
        </div>
      )}
    </div>
  )
}
