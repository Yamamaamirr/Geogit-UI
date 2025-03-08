"use client"

import React from "react"
import PropTypes from "prop-types"
import { ChevronRight, Home } from "lucide-react"

export const BreadcrumbNav = ({ path, onPathChange }) => {
  const handleClick = (index) => {
    onPathChange(path.slice(0, index + 1))
  }

  return (
    <nav className="flex items-center overflow-x-auto py-2 scrollbar-hide">
      <button
        onClick={() => onPathChange([])}
        className="flex items-center text-sm hover:text-github-accent transition-colors text-github-fg"
      >
        <Home className="w-4 h-4 mr-1" />
        root
      </button>

      {path.map((segment, index) => (
        <React.Fragment key={`${segment}-${index}`}>
          <ChevronRight className="w-4 h-4 mx-1 text-github-fgMuted" />
          <button
            onClick={() => handleClick(index)}
            className="flex items-center text-sm hover:text-github-accent transition-colors text-github-fg"
          >
            {segment}
          </button>
        </React.Fragment>
      ))}
    </nav>
  )
}

BreadcrumbNav.propTypes = {
  path: PropTypes.array.isRequired,
  onPathChange: PropTypes.func.isRequired,
}

