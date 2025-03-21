import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, FileCode, FileJson, FileImage, FileArchive, FileCog, FileIcon, Map, Globe, Loader 
} from "lucide-react";

// Map file extensions to icons
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();

  switch (extension) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return <FileCode className="w-4 h-4 text-yellow-500" />;
    case "json":
    case "geojson":
      return <FileJson className="w-4 h-4 text-green-500" />;
    case "md":
    case "txt":
      return <FileText className="w-4 h-4 text-blue-400" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
    case "gif":
    case "tif":
    case "tiff":
      return <FileImage className="w-4 h-4 text-purple-400" />;
    case "zip":
    case "rar":
    case "tar":
    case "gz":
    case "shp":
    case "shx":
    case "dbf":
      return <FileArchive className="w-4 h-4 text-orange-400" />;
    case "yml":
    case "yaml":
    case "config":
    case "prj":
      return <FileCog className="w-4 h-4 text-gray-400" />;
    case "kml":
    case "kmz":
      return <Globe className="w-4 h-4 text-blue-500" />;
    case "gpx":
    case "osm":
      return <Map className="w-4 h-4 text-green-400" />;
    default:
      return <FileIcon className="w-4 h-4 text-github-fgMuted" />;
  }
};

export const FileItem = ({ file, path, onContextMenu, level }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/map'); // Navigate after 1.5s
    }, 1500);
  };

  return (
    <>
      {/* Fullscreen Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
          <Loader className="h-8 w-8 text-[#0c94d4] animate-spin" />
        </div>
      )}

      {/* File Item */}
      <li
        className="group flex items-center py-1.5 px-2 hover:bg-github-navHighlight cursor-pointer transition-colors border-b border-github-border/10 last:border-b-0"
        onContextMenu={(e) => onContextMenu(e, file)}
        onClick={handleClick} // Add spinner-triggering onClick
      >
        <div className="flex items-center w-full">
          <span className="mr-2 flex-shrink-0">{getFileIcon(file.name)}</span>
          <span className="flex-grow truncate text-sm text-github-fg group-hover:text-github-fg">
            {file.name}
          </span>
          {file.lastCommit && (
            <div className="hidden md:flex items-center text-xs text-github-fgMuted ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="truncate max-w-[200px]">{file.lastCommit}</span>
              {file.timestamp && <span className="ml-2 whitespace-nowrap">{file.timestamp}</span>}
            </div>
          )}
        </div>
      </li>
    </>
  );
};

FileItem.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["file"]).isRequired,
    lastCommit: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
  path: PropTypes.array.isRequired,
  onContextMenu: PropTypes.func,
  level: PropTypes.number,
};
