"use client";
import { WalletAddressContext } from "@/context/WalletAddressContext";
import CardsList from "@/data/CardsList";
import { error } from "console";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Cards({
  setDriverAddress,
  priceOfCar,
}: {
  setDriverAddress: (address: string) => void;
  priceOfCar: string;
}) {
  const [activeIndex, setActiveIndex] = useState<any>();
  const { journeyCost } = useContext(WalletAddressContext);

  return (
    <div>
      <h2 className='text-md font-semibold'>Payment</h2>
      <div className='grid grid-cols-3 gap-0 mt-2 pl-2'>
        <div className='text-md'>Total ride cost :</div>
        {priceOfCar.length > 0 ? (
          <div className='font-semibold text-right col-span-2'>
            {priceOfCar} eth
          </div>
        ) : (
          "0.0 eth"
        )}
      </div>
      <input
        type='text'
        className='mt-2 pl-2 flex justify-between border-[1px] border-gray-300 rounded-md px-2.5 text-gray-300'
        onChange={(e) => setDriverAddress(e.target.value)}
      />
    </div>
  );
}

export default Cards;
