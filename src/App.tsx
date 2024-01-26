import { useEffect, useState } from "react";

import './App.css'
// import { useWeb3Modal } from "@web3modal/wagmi1/react";
// import { useAccount } from "wagmi";
import { TokenType } from "./types/Tokens";
// import { chainsList } from "./data/chains";
// import Button from "./UI/Button";
import ChainSelector from "./components/ChainSelector";

function App() {

  const [tokens, setTokens] = useState<Array<TokenType>>([]);
  const [getChain, setChain] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>();
  // const [getGas, setGas] = useState<string>();
  // const [getChain, setChain] = useState<string>('');
  
  // const { open } = useWeb3Modal();
  // const account = useAccount();

// useEffect(()=>{
//   if(getChain != ''){
//     getGasPrice(getChain);
//     console.log(getChain);
//   }

// },[getChain])

  useEffect(()=>{
    console.log(getChain)
    if(getChain != '' && getChain != undefined){
      getToken(getChain)
    }

  },[getChain])

  const getToken = async (chain: string) => {
  
    try {
      setLoading(true);
      var req = await fetch(`https://open-api.openocean.finance/v3/${chain}/tokenList`);
      var response = await req.json();
      setTokens(response.data);
      // console.log(response);
      // setChain(chain);
      // return;
      
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  
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
        <w3m-button />
        <w3m-network-button/>
      </div>
    
    <div className="mb-4 bg-slate-800">
      <ChainSelector onSelect={(cr) => setChain(cr)}/>
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

      {isLoading ? <h2 className="text-3xl text-white">Loading...</h2>  : 

      <div
       style={{
        display: "grid",
        gap: 5,
        gridTemplateColumns: '1fr 1fr 1fr 1fr'        
       }}
      >

        {/* <h2>GAS PRICE {getGas}</h2> */}

        {tokens.map((token) => {
          
          return (
          <div key={token.id}>
            <button className="grid" style={{textAlign: 'left', background: 'gray', color: 'white', gap: 10, flex: 1, width: '100%'}} >
              <span><img style={{width: '50px', aspectRatio: '1'}} src={token.icon}/></span>
              <span>
                {token.name}<br/>
                <small>USD: {token.usd}</small>
                </span>
              </button>
          </div>);
        })}
      </div>
      }
    </>
  );
}

export default App;
