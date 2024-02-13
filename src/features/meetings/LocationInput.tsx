import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Autocomplete from 'react-google-autocomplete'

function LocationInput() {
  const { setValue } = useFormContext()
  const [location, setLocation] = useState(null)

  const handlePlaceSelected = (place) => {
    const formattedAddress = place.formatted_address
    setLocation(formattedAddress)
    setValue('location', formattedAddress)
  }

  return (
    <div className="">
      <Autocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ['(regions)'],
        }}
        className="w-48 border-l-2 border-r-2 p-4 font-semibold outline-none hover:rounded-3xl hover:bg-slate-100"
      />
    </div>
  )
}

export default LocationInput
