"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { Search, X } from "lucide-react"

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-github-fgMuted" />
      </div>
      <input
        type="text"
        className="w-full py-1.5 pl-10 pr-10 border rounded-md bg-github-navHighlight border-github-border text-github-fg focus:outline-none focus:ring-1 focus:ring-github-accent/50 focus:border-github-accent/50 placeholder-github-fgMuted"
        placeholder="Find a file..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
          <X className="w-4 h-4 text-github-fgMuted hover:text-github-fg" />
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

