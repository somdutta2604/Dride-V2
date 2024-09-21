"use client";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Cars({ setPriceOfCar }: { setPriceOfCar: (price: string) => void }) {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDestinationChange } =
    useContext(DirectionDataContext);
  const { journeyCost, setjourneyCost } = useContext(DirectionDataContext);

  const getCost = (charges: number) => {
    return (
      charges *
      directionData?.routes[0].distance *
      0.0000621371192
    ).toFixed(2);
  };

  return (
    <div className='mt-3'>
      <h2 className='font-semibold'>Select A Car</h2>
      <div className='grid  grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
        {CarsList.map((items: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCar(index);
              setPriceOfCar(getCost(items.charges));
            }}
            className={`m-2 p-2 border-[1px] rounded-md w-fit hover:border-yellow-400 cursor-pointer ${
              index == selectedCar ? "border-yellow-400 border-[2px]" : null
            }`}
          >
            <Image
              src={items.image}
              alt='car'
              width={75}
              height={90}
              className='w-full'
            />
            <h2 className='text-sm text-gray-500'>
              {items.name}
              {directionData?.routes ? (
                <span className='float-right font-medium text-black text-sm'>
                  {getCost(items.charges)} eth
                </span>
              ) : null}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
