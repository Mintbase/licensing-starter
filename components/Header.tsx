import { Logo } from "./Logo"
import { Search } from "./Search"
import { WalletConnectButton } from "./WalletConnectButton"

export const Header = () => {
  return (
    <header className="heading">
      <Logo />
      <Search />
      <WalletConnectButton />
    </header>
  )
}