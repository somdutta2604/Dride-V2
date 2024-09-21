"use client";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinateContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinateContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { WalletAddressContext } from "@/context/WalletAddressContext";
import { useEffect, useState } from "react";
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const [journeyCost, setjourneyCost] = useState<any>(null);

  const [userLocation, setUserLocation] = useState<any>("");

  const [sourceCoordinates, setSourceCoordinates] = useState<any>("");
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>("");

  const [directionData, setDirectionData] = useState<any>();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <ClerkProvider>
      <html lang='en'>
        <WalletAddressContext.Provider
          value={{
            walletAddress,
            setWalletAddress,
            journeyCost,
            setjourneyCost,
          }}
        >
          <UserLocationContext.Provider
            value={{ userLocation, setUserLocation }}
          >
            <SourceCoordinatesContext.Provider
              value={{ sourceCoordinates, setSourceCoordinates }}
            >
              <DestinationCoordinatesContext.Provider
                value={{ destinationCoordinates, setDestinationCoordinates }}
              >
                <DirectionDataContext.Provider
                  value={{ directionData, setDirectionData }}
                >
                  <body className={outfit.className}>
                    <Navbar />

                    {children}
                  </body>
                </DirectionDataContext.Provider>
              </DestinationCoordinatesContext.Provider>
            </SourceCoordinatesContext.Provider>
          </UserLocationContext.Provider>
        </WalletAddressContext.Provider>
      </html>
    </ClerkProvider>
  );
}
