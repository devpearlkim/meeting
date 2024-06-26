import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import { usePopper } from 'react-popper'
import { useFormContext } from 'react-hook-form'

export default function DatePickerDialog({ default_meeting_date }) {
  const [selected, setSelected] = useState<Date>()
  const [inputValue, setInputValue] = useState<string>('')
  const [isPopperOpen, setIsPopperOpen] = useState(false)

  const popperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )

  useEffect(() => {
    if (default_meeting_date) {
      const parsedDate = parse(default_meeting_date, 'yyyy-MM-dd', new Date())
      setSelected(parsedDate)
    }
  }, [default_meeting_date])

  useEffect(() => {
    if (isValid(selected)) {
      setValue('meeting_date', format(selected, 'yyyy-MM-dd'))
    }
  }, [selected])

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
    let nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 1)

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
    setSelected(date)
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
          placeholder={default_meeting_date ?? format(new Date(), 'y-MM-dd')}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          ref={inputRef}
          className="font-semibold"
          readOnly
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={handleButtonClick}
          className="rounded bg-cyan-400 px-2 py-1 text-white hover:bg-cyan-500"
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
