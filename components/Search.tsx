import { useCallback, useState } from "react"
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
    }, 650)
  , []);

  const handleSearchInput = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedChangeHandler(term);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const term = e.target.elements[0].value;
    router.push(`/search/${term}`);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
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