"use client"

import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

// Create context for dropdown state
const DropdownMenuContext = createContext(null)

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

DropdownMenu.propTypes = {
  children: PropTypes.node,
}

export const DropdownMenuTrigger = ({ asChild, children, ...props }) => {
  const { open, setOpen } = useContext(DropdownMenuContext)

  const handleClick = (e) => {
    e.preventDefault()
    setOpen(!open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      "aria-expanded": open,
      "data-state": open ? "open" : "closed",
      ...props,
    })
  }

  return (
    <button type="button" onClick={handleClick} aria-expanded={open} data-state={open ? "open" : "closed"} {...props}>
      {children}
    </button>
  )
}

DropdownMenuTrigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node,
}

export const DropdownMenuContent = ({ children, className = "", align = "center", side = "bottom", ...props }) => {
  const { open } = useContext(DropdownMenuContext)

  if (!open) return null

  // Handle alignment
  let alignClass = "left-1/2 -translate-x-1/2" // center
  if (align === "start") alignClass = "left-0"
  if (align === "end") alignClass = "right-0"

  // Handle side
  let sideClass = "top-full mt-1" // bottom
  if (side === "top") sideClass = "bottom-full mb-1"
  if (side === "left") sideClass = "right-full mr-1"
  if (side === "right") sideClass = "left-full ml-1"

  return (
    <div
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-github-border bg-github-canvasSubtle p-1 shadow-md ${alignClass} ${sideClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

DropdownMenuContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(["center", "start", "end"]),
  side: PropTypes.oneOf(["top", "right", "bottom", "left"]),
}

export const DropdownMenuItem = ({ children, className = "", onSelect, ...props }) => {
  const { setOpen } = useContext(DropdownMenuContext)

  const handleClick = (e) => {
    if (onSelect) onSelect(e)
    setOpen(false)
  }

  return (
    <button
      className={`relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-github-navHighlight hover:text-github-fg ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

DropdownMenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSelect: PropTypes.func,
}

