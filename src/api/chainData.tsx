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
