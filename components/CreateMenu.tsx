import Link from "next/link"
import { useRouter } from "next/router"

export const CreateMenu = () => {
  const { pathname } = useRouter();
  // console.log(pathname)
  // TODO: highlight current item with path
  return (
    <div className="create-menu">
      <span>Licenses</span>
      <Link href="/create">Dashboard</Link>
      <Link href="/mint">Create</Link>
      <Link href="/manage">Manage</Link>
      <span>Profile</span>
      <Link href="/earnings">Earnings</Link>
      <Link href="/ramp">Cash Out</Link>
      <Link href="/settings">Settings</Link>
    </div>
  )
}