"use client"
import PropTypes from "prop-types"
import { Copy, Download, Edit, Trash, FileEdit, FolderPlus, FilePlus } from "lucide-react"

export const ContextMenu = ({ x, y, item }) => {
  const isFolder = item?.type === "folder"

  const menuItems = [
    { icon: <Copy className="w-4 h-4 mr-2" />, label: "Copy path" },
    { icon: <Download className="w-4 h-4 mr-2" />, label: "Download" },
    { icon: <Edit className="w-4 h-4 mr-2" />, label: "Rename" },
    { icon: <Trash className="w-4 h-4 mr-2" />, label: "Delete", danger: true },
  ]

  if (isFolder) {
    menuItems.splice(
      2,
      0,
      { icon: <FolderPlus className="w-4 h-4 mr-2" />, label: "New folder" },
      { icon: <FilePlus className="w-4 h-4 mr-2" />, label: "New file" },
    )
  } else {
    menuItems.splice(2, 0, { icon: <FileEdit className="w-4 h-4 mr-2" />, label: "Edit" })
  }

  return (
    <div
      className="absolute z-50 min-w-[180px] bg-github-canvasSubtle text-github-fg rounded-md shadow-lg border border-github-border overflow-hidden"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: `translate(${x + 180 > window.innerWidth ? "-100%" : "0"}, ${y + menuItems.length * 36 > window.innerHeight ? "-100%" : "0"})`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {menuItems.map((menuItem, index) => (
          <button
            key={index}
            className={`w-full flex items-center px-3 py-2 text-sm hover:bg-github-navHighlight transition-colors ${menuItem.danger ? "text-github-danger hover:text-github-danger" : "text-github-fg hover:text-github-fg"}`}
            onClick={() => console.log(`Action: ${menuItem.label} on ${item.name}`)}
          >
            {menuItem.icon}
            {menuItem.label}
          </button>
        ))}
      </div>
    </div>
  )
}

ContextMenu.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["file", "folder"]).isRequired,
  }),
}

