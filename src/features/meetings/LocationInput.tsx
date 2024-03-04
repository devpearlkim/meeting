import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Autocomplete from 'react-google-autocomplete'
import { useLocation } from 'react-router-dom'

function LocationInput({ style, default_location }) {
  const { setValue } = useFormContext()
  const [location, setLocation] = useState(null)
  const searchParams = new URLSearchParams(useLocation().search)
  let initialLocation = searchParams.get('location') ?? ''
  if (default_location) initialLocation = default_location

  useEffect(() => {
    setLocation(initialLocation)
    setValue('location', initialLocation)
  }, [initialLocation, setValue])

  const handlePlaceSelected = (place) => {
    const formattedAddress = place.formatted_address
    setLocation(formattedAddress)
    setValue('location', formattedAddress)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value === '') {
      setLocation(null)
      setValue('location', '')
    }
  }

  return (
    <div className="">
      <Autocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        defaultValue={initialLocation ?? ''}
        onPlaceSelected={handlePlaceSelected}
        onChange={handleInputChange}
        options={{
          types: ['(regions)'],
        }}
        className={`${style == 'post' ? 'w-40 rounded border px-2 py-1 outline-blue-500' : 'w-48 border-l-2 border-r-2 p-4 font-semibold outline-none hover:rounded-3xl hover:bg-slate-100'}`}
      />
    </div>
  )
}

export default LocationInput
