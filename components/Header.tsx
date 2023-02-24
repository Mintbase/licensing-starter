import { Logo } from "./Logo"
import { Menu } from "./Menu"
import { Search } from "./Search"
import { WalletConnectButton } from "./WalletConnectButton"

export const Header = () => {
  return (
    <header className="heading">
      <Logo />
      <Search />
      <Menu />
      <WalletConnectButton />
    </header>
  )
}