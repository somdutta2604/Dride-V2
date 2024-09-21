import { DirectionDataContext } from '@/context/DirectionDataContext'
import React, { useContext } from 'react'

function DistanceTime() {
    const  {directionData, setDirectionData} = useContext(DirectionDataContext)
  return directionData?.routes&&(
    <div className='bg-yellow-500 p-3 flex'>
        <h2 className='text-yellow-100 opcaity-80 text-[15px]'>
            Distance: <span className='font-bold mr-3 text-black'>{(directionData?.routes[0]?.distance*0.000621371192).toFixed(2)} Miles</span>
        </h2>
        <h2 className='text-yellow-100 opcaity-80 text-[15px]'>
            Duration: <span className='font-bold mr-3 text-black'>{(directionData?.routes[0]?.distance/60).toFixed(2)} Min</span>
        </h2>
    </div>
  )
}

export default DistanceTime