"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div>
          <Booking />
        </div>
        <div className='col-span-2 order-first md:order-last w-full'>
          <MapBoxMap />
        </div>
      </div>
    </>
  );
}
