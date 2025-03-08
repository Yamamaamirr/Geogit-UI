"use client"
import PropTypes from "prop-types"
import { ChevronRight, Folder, FolderOpen } from "lucide-react"

export const FolderItem = ({ folder, path, isExpanded, onToggle, onContextMenu, children, level }) => {
  return (
    <li className="border-b border-github-border/10 last:border-b-0">
      <div
        className="group flex items-center py-1.5 px-2 hover:bg-github-navHighlight cursor-pointer transition-colors"
        onClick={onToggle}
        onContextMenu={(e) => onContextMenu(e, folder)}
      >
        <div className="flex items-center w-full">
          <ChevronRight
            className={`w-4 h-4 mr-1 transition-transform duration-200 text-github-fgMuted ${isExpanded ? "rotate-90" : ""}`}
          />
          <span className="mr-2 text-github-accent">
            {isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
          </span>
          <span className="font-medium text-sm text-github-fg group-hover:text-github-fg">{folder.name}</span>
          {folder.lastCommit && (
            <div className="hidden md:flex items-center text-xs text-github-fgMuted ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="truncate max-w-[200px]">{folder.lastCommit}</span>
              {folder.timestamp && <span className="ml-2 whitespace-nowrap">{folder.timestamp}</span>}
            </div>
          )}
        </div>
      </div>
      {children}
    </li>
  )
}

FolderItem.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["folder"]).isRequired,
    children: PropTypes.array,
    lastCommit: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
  path: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func,
  children: PropTypes.node,
  level: PropTypes.number,
}

