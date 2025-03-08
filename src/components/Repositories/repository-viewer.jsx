"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { FileTree } from "./components/file-tree"
import { RepositoryHeader } from "./components/repository-header"
import { BreadcrumbNav } from "./components/breadcrumb-nav"
import { SearchBar } from "./components/search-bar"
import { ContextMenu } from "./components/context-menu"

const RepositoryViewer = ({ repoData }) => {
  const [currentPath, setCurrentPath] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState(repoData)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  })

  // Filter files based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(repoData)
      return
    }

    const filterFiles = (items, query) => {
      return items.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(query.toLowerCase())

        if (item.type === "folder" && item.children) {
          const matchingChildren = filterFiles(item.children, query)
          if (matchingChildren.length > 0) {
            return true
          }
        }

        return matchesName
      })
    }

    const filtered = filterFiles([repoData], searchQuery)
    setFilteredData(filtered[0])
  }, [searchQuery, repoData])

  // Handle path navigation
  const handlePathChange = (path) => {
    setCurrentPath(path)
  }

  // Handle context menu
  const handleContextMenu = (e, item) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      item,
    })
  }

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ ...contextMenu, visible: false })
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [contextMenu])

  return (
    <div className="flex flex-col h-screen bg-github-canvas text-github-fg">
      <RepositoryHeader name={repoData.name} description={repoData.description} stats={repoData.stats} />

      <div className="flex-1 overflow-auto scrollbar-hide">
        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <BreadcrumbNav path={currentPath} onPathChange={handlePathChange} />
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="bg-github-canvasSubtle border border-github-border rounded-md overflow-hidden shadow-sm">
            <FileTree
              data={filteredData}
              currentPath={currentPath}
              onPathChange={handlePathChange}
              onContextMenu={handleContextMenu}
            />
          </div>
        </div>
      </div>

      {contextMenu.visible && <ContextMenu x={contextMenu.x} y={contextMenu.y} item={contextMenu.item} />}
    </div>
  )
}

RepositoryViewer.propTypes = {
  repoData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stats: PropTypes.shape({
      commits: PropTypes.number,
      branches: PropTypes.number,
      contributors: PropTypes.number,
    }),
    type: PropTypes.oneOf(["folder"]).isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
}

export default RepositoryViewer

