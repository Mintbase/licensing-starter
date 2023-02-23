import { useState } from "react"

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <form className="search-form">
      <input
        className="input"
        type="text"
        placeholder="Search creative..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}