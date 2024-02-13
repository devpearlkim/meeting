import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const LimitNumInput = () => {
  const { register, watch, setValue } = useFormContext()
  const [sliderVisible, setSliderVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const minValue = watch('minValue')
  const maxValue = watch('maxValue')

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value
    setSelectedOption(selectedOption)

    if (selectedOption === '직접선택') {
      setSliderVisible(true)
    } else {
      setSliderVisible(false)
      switch (selectedOption) {
        case '5인미만':
          setValue('minValue', 1)
          setValue('maxValue', 4)
          break
        case '20인이상':
          setValue('minValue', 20)
          setValue('maxValue', 50)
          break
        default:
          break
      }
    }
  }

  const handleSliderChange = (event, newValue) => {
    setValue('minValue', newValue[0])
    setValue('maxValue', newValue[1])
  }

  return (
    <div className="">
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: 0,
            },
          '& .MuiSelect-select': {
            fontWeight: '600',
            color: 'gray',
          },
        }}
        displayEmpty
      >
        <MenuItem value="" disabled>
          인원선택
        </MenuItem>
        <MenuItem value="5인미만">5인 미만</MenuItem>
        <MenuItem value="20인이상">20인 이상</MenuItem>
        <MenuItem value="직접선택">직접 선택</MenuItem>
      </Select>
      {sliderVisible && (
        <Slider
          value={[minValue, maxValue]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={1}
          max={50}
        />
      )}
    </div>
  )
}

export default LimitNumInput
