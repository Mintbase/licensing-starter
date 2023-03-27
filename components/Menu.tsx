import Link from "next/link"

export const Menu = () => {

  return (
    <div className="menu">
      <Link href="/create">Create</Link>
      <Link href="/about">About</Link>
    </div>
  )
}