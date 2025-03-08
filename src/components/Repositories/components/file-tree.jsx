"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { FileItem } from "./file-item"
import { FolderItem } from "./folder-item"

export const FileTree = ({ data, currentPath = [], onPathChange, onContextMenu }) => {
  const [expandedFolders, setExpandedFolders] = useState({})

  // Toggle folder expansion
  const toggleFolder = (folderPath) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }))
  }

  // Check if a folder is expanded
  const isFolderExpanded = (folderPath) => {
    return !!expandedFolders[folderPath]
  }

  // Recursive function to render file tree
  const renderTree = (items, path = []) => {
    if (!items || !Array.isArray(items)) return null

    return (
      <ul className="space-y-0">
        {items.map((item, index) => {
          const itemPath = [...path, item.name]
          const pathString = itemPath.join("/")

          if (item.type === "folder") {
            return (
              <FolderItem
                key={`folder-${pathString}-${index}`}
                folder={item}
                path={itemPath}
                isExpanded={isFolderExpanded(pathString)}
                onToggle={() => toggleFolder(pathString)}
                onContextMenu={(e) => onContextMenu(e, item)}
                level={path.length}
              >
                {isFolderExpanded(pathString) && item.children && (
                  <div className="ml-6 pl-2 border-l border-github-border/30">
                    {renderTree(item.children, itemPath)}
                  </div>
                )}
              </FolderItem>
            )
          } else {
            return (
              <FileItem
                key={`file-${pathString}-${index}`}
                file={item}
                path={itemPath}
                onContextMenu={(e) => onContextMenu(e, item)}
                level={path.length}
              />
            )
          }
        })}
      </ul>
    )
  }

  return (
    <div className="file-tree w-full overflow-auto scrollbar-hide p-2">
      {data.type === "folder" && data.children ? (
        renderTree(data.children, [data.name])
      ) : (
        <div className="text-github-fgMuted p-4">No files found</div>
      )}
    </div>
  )
}

FileTree.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.array,
  }).isRequired,
  currentPath: PropTypes.array,
  onPathChange: PropTypes.func,
  onContextMenu: PropTypes.func,
}

