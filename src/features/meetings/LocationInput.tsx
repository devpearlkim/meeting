import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Autocomplete from 'react-google-autocomplete'
import { useLocation } from 'react-router-dom'

function LocationInput({ style }) {
  const { setValue } = useFormContext()
  const [location, setLocation] = useState(null)
  const searchParams = new URLSearchParams(useLocation().search)
  const initialLocation = searchParams.get('location') ?? ''

  useEffect(() => {
    setLocation(initialLocation)
    setValue('location', initialLocation)
  }, [initialLocation, setValue])

  const handlePlaceSelected = (place) => {
    const formattedAddress = place.formatted_address
    setLocation(formattedAddress)
    setValue('location', formattedAddress)
  }

  return (
    <div className="">
      <Autocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        defaultValue={initialLocation ?? ''}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ['(regions)'],
        }}
        className={`${style == 'post' ? 'w-40 rounded border px-2 py-1 outline-blue-500' : 'w-48 border-l-2 border-r-2 p-4 font-semibold outline-none hover:rounded-3xl hover:bg-slate-100'}`}
      />
    </div>
  )
}

export default LocationInput
