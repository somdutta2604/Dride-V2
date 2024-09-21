"use client";
import { WalletAddressContext } from "@/context/WalletAddressContext";
import { connect } from "http2";
import { useContext, useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function ConnectWallet() {
  const { walletAddress, setWalletAddress } = useContext(WalletAddressContext);
  // const [address, setAddress] = useState<string | null>(null);

  // const [errorMessaage, setErrorMessaage] = useState<any>(null);
  // const [userBalance, setUserBalance] = useState<any>(null);
  console.log(walletAddress);
  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  }, []);

  useEffect(() => {}, [walletAddress]);

  const handleConnect = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      if (!walletAddress) {
        try {
          const accounts = await window.ethereum?.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Plase install metamask");
    }
  };

  const getCurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      if (!walletAddress) {
        try {
          const accounts = await window.ethereum?.request({
            method: "eth_accounts",
          });
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Plase install metamask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountChanged", (accounts: any) => {
        if (!accounts.length) {
          setWalletAddress(null);
        } else {
          setWalletAddress(accounts[0]);
          console.log("Account changed");
        }
      });
    } else {
      setWalletAddress(null);
      console.log("Plase install metamask");
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        className='px-2 p-[2px] font-semibold rounded-full bg-[#F4A424] text-white hover:shadow-sm hover:shadow-gray-400'
      >
        {walletAddress
          ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
}

export default ConnectWallet;
