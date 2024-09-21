import React, { useContext, useState } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { WalletAddressContext } from "@/context/WalletAddressContext";

function Booking() {
  const [driverAddress, setDriverAddress] = useState<string>("");
  const { walletAddress } = useContext(WalletAddressContext);
  const [priceOfCar, setPriceOfCar] = useState<string>("");

  const sendTransaction = async () => {
    const params = [
      {
        from: walletAddress,
        to: driverAddress,
        gas: "2",
        gasPrice: "60",
        value: "100000000000000",
        data: "payment",
      },
    ];

    const result = await window.ethereum
      ?.request({ method: "eth_sendTransaction", params })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className='p-5'>
      <h2 className='text-xl font-semibold'>Booking</h2>
      <div className='border-[1px] p-5 rounded-md h-full'>
        <AutocompleteAddress />
        <Cars setPriceOfCar={setPriceOfCar} />
        <Cards setDriverAddress={setDriverAddress} priceOfCar={priceOfCar} />
        <button
          className='w-full  bg-yellow-400 p-1 rounded-md mt-4'
          onClick={sendTransaction}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
