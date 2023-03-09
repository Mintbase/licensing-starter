import Link from "next/link"

export const Menu = () => {

  return (
    <div className="menu">
      <Link href="/mint">Create</Link>
      <Link href="/about">About</Link>
    </div>
  )
}