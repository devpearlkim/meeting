import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const CountInput = ({ default_count }) => {
  const { setValue } = useFormContext()
  const [count, setCount] = useState(2)

  useEffect(() => {
    if (default_count) {
      setCount(default_count)
    }
  }, [default_count])

  const handleDecrement = () => {
    const newCount = count - 1
    setCount(newCount)
    // setValue('member_limit', newCount)
    //watch, useEffect onChange->상위->useState
  }

  useEffect(() => {
    setValue('member_limit', count)
  }, [count])

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    // setValue('member_limit', newCount)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (!isNaN(value)) {
      const newCount = parseInt(value)
      setCount(newCount)
      // setValue('member_limit', newCount)
    }
  }

  return (
    <div className="flex h-10 w-32 rounded bg-gray-100 text-gray-300 outline-none">
      <button
        type="button"
        onClick={handleDecrement}
        className="cursor-pointer rounded px-2 hover:bg-gray-400 hover:text-black"
        disabled={count <= 2}
      >
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        id="count"
        className="text-md flex w-full cursor-default items-center bg-gray-100 text-center font-semibold text-black outline-none"
        value={count}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="cursor-pointer rounded px-2 hover:bg-gray-400 hover:text-black"
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  )
}

export default CountInput
