import { useAccount, useBalance, useBlockNumber, useFeeData } from "wagmi";
import { useEffect } from "react";
import './App.css'
import WalletActions from "./components/WalletActions";

export default function App() {

    const { data: blockNumber } = useBlockNumber();
    const { data: feeData } = useFeeData({ formatUnits: 'ether' });

    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({ address, formatUnits: 'ether' });

  useEffect(() => {
    console.log(
      `Current connection status: ${isConnected ? "connected" : "disconnected"}`
    );
  }, [isConnected]);

  useEffect(() => {
    console.log(
      `Current fee ${feeData?.formatted.gasPrice ?? 0}`
    );
  }, [feeData, blockNumber]);

  return (
    <>
      <p
        className="status"
        style={{
          color: isConnected ? "green" : "red",
        }}
      >
        {" "}
        {isConnected !== undefined
          ? isConnected
            ? "Connected"
            : "Disconnected"
          : "loading..."}
      </p>
      <div className="maincontainer">
        <div className="container">
            <div>
                    <p>Address: {address}</p>
                    <p>Balance: {balance?.formatted} {balance?.symbol}</p>
                    <p>Block number: {String(blockNumber ?? 0)}</p>
                    <p>Gas price: {feeData?.formatted.gasPrice ?? 0} ETH</p>
                </div>
          </div>
        

        {/* Render the WalletActions */}
            <WalletActions />

        {/* mint nft */}
      </div>
    </>
  );
}