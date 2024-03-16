import { useState } from "react";
// import { useSwitchNetwork, useNetwork } from 'wagmi';
import { useNetwork } from 'wagmi';
// import { useWeb3ModalEvents } from "@web3modal/wagmi1/react";
// import { NetworkController } from "@web3modal/core";
import { ModalController } from "@web3modal/core";

import './App.css'
// import { useWeb3Modal } from "@web3modal/wagmi1/react";
// import { useAccount } from "wagmi";
// import { TokenType } from "./types/Tokens";
// import { chainsList } from "./data/chains";
// import Button from "./UI/Button";
import ChainSelector from "./components/ChainSelector";
import PoolsTable from "./components/PoolsTable";
// import { chains } from "./config";

function App() {

  // const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork()
  const activeChain = chain?.name;

  // const [tokens, setTokens] = useState<Array<TokenType>>([]);
  const [getChain, setChain] = useState<string>();
  // const [isLoading, setLoading] = useState<boolean>();
  // const [getGas, setGas] = useState<string>();
  // const [getChain, setChain] = useState<string>('');
  
  // const { open } = useWeb3Modal();
  // const {data} = useWeb3ModalEvents();
  // const account = useAccount();

// useEffect(()=>{
//   if(getChain != ''){
//     getGasPrice(getChain);
//     console.log(getChain);
//   }

// },[getChain])

  // useEffect(()=>{
  //   // console.log(getChain)

  //   if(getChain != '' && getChain != undefined){
  //     getToken(getChain)
  //   }

  // },[getChain])

  const setModal = () => {
    ModalController.open({view: "ConnectingSiwe"});
    // NetworkController.switchActiveNetwork('ethereum');
  }

  // const getToken = async (chain: string) => {
  
  //   try {
  //     setLoading(true);
  //     const req = await fetch(`https://open-api.openocean.finance/v3/${chain}/tokenList`);
  //     const response = await req.json();
  //     setTokens(response.data);
  //     // console.log(response);
  //     // setChain(chain);s
  //     // return;
      
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setLoading(false);
  // };

  // const handleNetworkSwitch = async () => {
  //   if(switchNetwork){
  //     switchNetwork(1); // Arbitrum network id
  //     const result = window.confirm(`Switch to Arbitrum?`);
  //     if (result) {
  //       await switchNetwork(42161);
  //     }
  //   }
  // }
  
  // const getGasPrice = async (token: string) => {
  //   try {

  //     var req = await fetch(`https://open-api.openocean.finance/v3/${token}/gasPrice`);
  //     var response = await req.json();

  //     if(response.without_decimals.isInteger){
  //       setGas(response.without_decimals);
  //     }
  //     else{
  //       setGas(response.without_decimals.standard);
  //     }
  //     // setGas(response.data.standard);

  //     return;
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

        return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        {activeChain && <div>Connected to {activeChain}</div>}
        <button className="text-white" onClick={setModal}>
          Switch to Arbitrum
        </button>
        <w3m-button />
        <w3m-network-button />
      </div>

      <div className="mb-4 bg-slate-800">
        <ChainSelector onSelect={(cr) => setChain(cr)} />
      </div>
      {/* <div className="flex gap-3 flex-row flex-wrap">
        {chainsList.map((chain) => {
          return (
            <Button key={chain.value} clasName="flex-shrink flex-1 flex items-center gap-2 flex-col" onClick={() => getToken(chain.value)}>
              <span>
                <img style={{width: '50px', aspectRatio: '1'}} src={chain.logo}/>
                </span>
              {chain.label}
            </Button>
            );
        })}
      </div> */}

      {getChain && <PoolsTable network={getChain} />}
    </>
  );
}

export default App;
