import { useSignMessage, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction, useNetwork } from "wagmi";
import { parseEther } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

export default function walletActions() {

    const { chain } = useNetwork();

    const { config } = usePrepareSendTransaction({
        chainId: polygonMumbai.id,
        to: 'RECEIVER ADDRESS HERE',
        value: parseEther('0.001'),
    });

    const { data: txData, sendTransaction } = useSendTransaction(config);

    const { data: signedHash, signMessage } = useSignMessage({
        message: "Sign this message to prove you are the owner of this wallet",
    });

    useWaitForTransaction({
        chainId: polygonMumbai.id,
        hash: txData?.hash,
        onSuccess() {
          alert('Transaction succeeded!'+' /n 0.001 MATIC sent successfully');
        },
      });

  return (
    <>
      {/* Show the signedHash */}
      {signedHash && (
        <div className="block">
          <p>Signature hash: {signedHash}</p>
        </div>
      )}

      {/* Add a button to sign the message */}
      <div className="block">
        <button title="Sign message" onClick={() => signMessage()}>
          Sign message
        </button>
      </div>

      {/* Add a button to send the transaction */}
        <div className="block">
            <button
                disabled={chain && chain.id !== polygonMumbai.id}
                onClick={() => sendTransaction?.()}
            >
                Send 0.001 MATIC
            </button>
        </div>
    </>
  );
}
