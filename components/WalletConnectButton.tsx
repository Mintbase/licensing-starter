import { useWallet } from  '@mintbase-js/react'

export const  WalletConnectButton = () => {
  const {
    connect,
    disconnect,
    activeAccountId,
    isConnected,
  } = useWallet();


  if (!isConnected) {
    return( 
    <div>
         <button  onClick={connect}>Connect To NEAR</button>
    </div>
   )
  }

  return (
    <div>
      <p>You are connected as {activeAccountId}</p>
      <button  onClick={disconnect}>Disconnect</button>
    </div>
  )
}