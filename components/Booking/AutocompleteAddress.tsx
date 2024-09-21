"use client"
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinateContext';
import { SourceCoordinatesContext } from '@/context/SourceCoordinateContext';
import React, { useContext, useEffect, useState } from 'react'



const BASE_URL="https://api.mapbox.com/search/searchbox/v1/retrieve/"



function AutocompleteAddress() {


  const [source, setSource] = useState<any>('');
  const [destination,setDistination]=useState<any>('')

  const [sourceChange,setSourceChange]=useState<Boolean>(false)
  const [destinationChange,setDestinationChange]=useState<Boolean>(false)

  const {sourceCoordinates, setSourceCoordinates} =useContext<any>(SourceCoordinatesContext)
  const {destinationCoordinates, setDestinationCoordinates} = useContext<any>(DestinationCoordinatesContext)


  const [addressList, setAddressList] = useState<any>(false);
  

  useEffect(()=>{
    const delayDebounce = setTimeout(()=>{
      getAddressList()
    },1000)
    return ()=>clearTimeout(delayDebounce)
  },[source])

  useEffect(()=>{
    const delayDebounce = setTimeout(()=>{
      getAddressList()
    },1000)
    return ()=>clearTimeout(delayDebounce)
  },[destination])

  const getAddressList = async () =>{
    const query=sourceChange?source:destination;
    const res= await fetch(`api/search-address?q=${query}`,
    {
      headers:{
        "Content-Type":"application/json",
      }
    })
    
    const result=await res.json()
    
    setAddressList(result);
  }

  const onSourceAddressClick=async(item:any)=>{
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false)
    
const res = await fetch(`api/get-coordinate?map_id=${item.mapbox_id}`,
{
  headers:{
    "Content-Type":"application/json",
  }
})
const result = await res.json();

setSourceCoordinates(
  {

    lng:result.features[0].geometry.coordinates[0],
    lat:result.features[0].geometry.coordinates[1],
  }
)


}

const onDestinationAddressClick=async(item:any)=>{
  setDistination(item.full_address);
  setAddressList([]);
  setDestinationChange(false)

     
const res = await fetch(`api/get-coordinate?map_id=${item.mapbox_id}`,
{
  headers:{
    "Content-Type":"application/json",
  }
})
const result = await res.json();

setDestinationCoordinates(
  {
    lng:result.features[0].geometry.coordinates[0],
    lat:result.features[0].geometry.coordinates[1],
  }
)


}

  return (
    <div className=''>
        <div className='relative'>
            <label className='text-gray-400 dark:text-gray-600'>
                Where From?
            </label>
            <input id='source' onChange={(e)=>{
                    setSource(e.target.value);
                    setSourceChange(true)
                }} value={source} type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'/>
            
            {addressList?.suggestions&&sourceChange?
            <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item:any,index:number)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={()=>{onSourceAddressClick(item)}}
                >{item.full_address}</h2>
            ))}
           </div>:null}
        </div>

        <div className='mt-3'>
        <label className='text-gray-400 dark:text-gray-600'>
                Where to?
            </label>
            <input id='destination' value={destination}
                onChange={(e)=>{setDistination(e.target.value);setDestinationChange(true)}} type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'/>
            
            {addressList?.suggestions&&destinationChange?
            <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white'>
            {addressList?.suggestions.map((item:any,index:number)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={()=>{
                    onDestinationAddressClick(item)}}
                >{item.full_address}</h2>
            ))}
           </div>:null}

        </div>
    </div>
  )
}

export default AutocompleteAddress;