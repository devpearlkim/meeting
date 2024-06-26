import { useState, useEffect, useRef } from 'react'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import { ko } from 'date-fns/locale'

export default function CalendarInput() {
  const [selectedRange, setSelectedRange] = useState({
    from: new Date(),
    to: new Date(),
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef(null)
  const { setValue } = useFormContext()

  const disabledDays = {
    before: new Date(),
  }

  const handleInputChange = () => {
    setShowCalendar(true)
  }

  useEffect(() => {
    setValue('from', format(selectedRange.from, 'yyyy-MM-dd'))
    setValue('to', format(selectedRange.to || selectedRange.from, 'yyyy-MM-dd'))
  }, [selectedRange])

  const handleDayClick = (range) => {
    setSelectedRange(range)
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
        <div className="shrink-0">
          <IconButton disabled>
            <CalendarToday />
          </IconButton>
          <input
            className="border-r py-4 font-bold outline-none"
            size={10}
            placeholder="시작기간"
            value={
              selectedRange ? format(selectedRange.from, 'yyyy-MM-dd') : ''
            }
            onFocus={() => handleInputChange(true)}
            readOnly
          />
        </div>
        <div className="shrink-0 pl-2">
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
