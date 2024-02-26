import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { format, isBefore, isValid, parse } from 'date-fns'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import { usePopper } from 'react-popper'
import toast from 'react-hot-toast'
import { useFormContext } from 'react-hook-form'
import LocationInput from './LocationInput'

export default function DatePickerDialog() {
  const [selected, setSelected] = useState<Date>()
  const [inputValue, setInputValue] = useState<string>('')
  const [isPopperOpen, setIsPopperOpen] = useState(false)

  const popperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  })

  const { setValue } = useFormContext()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popperElement &&
        !popperElement.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPopperOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popperElement])

  const closePopper = () => {
    setIsPopperOpen(false)
    buttonRef?.current?.focus()
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value)
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date())
    if (isValid(date)) {
      setSelected(date)
    } else {
      setSelected(undefined)
    }
  }

  const handleButtonClick = () => {
    setIsPopperOpen(true)
  }

  const handleInputClick = () => {
    setIsPopperOpen(true)
  }

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    if (isBefore(date, new Date())) {
      toast.error('오늘 이후의 날짜를 선택하세요')
      return
    }
    setSelected(date)
    setValue('date', format(date, 'yyyy-MM-dd'))
    if (date) {
      setInputValue(format(date, 'y-MM-dd'))
      closePopper()
    } else {
      setInputValue('')
    }
  }

  const disabledDays = {
    before: new Date(),
  }

  return (
    <div>
      <div ref={popperRef}>
        <input
          size={12}
          type="text"
          placeholder={format(new Date(), 'y-MM-dd')}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick} // 이 부분 추가
          ref={inputRef} // ref 추가
          className="font-semibold"
          readOnly
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={handleButtonClick}
          className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
        >
          날짜선택
        </button>
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          className="dialog-sheet bg-white shadow-md"
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
          // aria-label="DayPicker calendar"
        >
          <DayPicker
            initialFocus={isPopperOpen}
            mode="single"
            defaultMonth={selected}
            selected={selected}
            disabled={disabledDays}
            onSelect={handleDaySelect}
          />
        </div>
      )}
    </div>
  )
}
