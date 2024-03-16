// const getToken = async (chain: string) => {
//   try {
//     var req = await fetch(
//       `https://open-api.openocean.finance/v3/${chain}/tokenList`
//     );
//     var response = await req.json();
//     // setTokens(response.data);
//     // setChain(chain);
    
//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getGasPrice = async (token: string) => {
//   try {
//     var req = await fetch(
//       `https://open-api.openocean.finance/v3/${token}/gasPrice`
//     );
//     var response = await req.json();

//     // if (response.without_decimals.isInteger) {
//     //   setGas(response.without_decimals);
//     // } else {
//     //   setGas(response.without_decimals.standard);
//     // }
//     // setGas(response.data.standard);

//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getPools = async (network: string, page: number = 1) => {
  try {

    // if(page < 1){
    //     page = 1;
    // }

    page = page+1;
    
    var req = await fetch(
    //   `https://api.geckoterminal.com/api/v2/search/pools?query=${network}&page=1`
    `https://api.geckoterminal.com/api/v2/search/pools?query=${network}&include=dex,dex.network,dex.network.network_metric,tokens&page=${page}`
    );
    var response = await req.json();

    return response.data;

  } catch (error) {
    console.log(error);
  }
};