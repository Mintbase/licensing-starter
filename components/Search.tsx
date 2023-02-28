import { useCallback, useEffect, useState } from "react"
import { useRouter } from 'next/router'
import debounce from 'debounce';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const debouncedChangeHandler = useCallback(
    debounce((term: string) => {
      if (term > '') {
        router.push(`/search/${term}`)
      }
    }, 150)
  , []);

  const handleSearchInput = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedChangeHandler(term);
  }

  return (
    <form className="search-form">
      <input
        className="input"
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={handleSearchInput}
      />
    </form>
  )
}