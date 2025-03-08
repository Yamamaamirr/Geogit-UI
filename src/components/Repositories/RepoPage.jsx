import RepositoryViewer from "./repository-viewer"

// Sample geospatial repository data
const sampleRepoData = {
  name: "geo-data-explorer",
  description: "A comprehensive geospatial data visualization and analysis toolkit for GIS professionals",
  stats: {
    commits: 247,
    branches: 8,
    contributors: 12,
  },
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      lastCommit: "Improve projection handling",
      timestamp: "2d ago",
      children: [
        {
          name: "components",
          type: "folder",
          lastCommit: "Add layer control panel",
          timestamp: "3d ago",
          children: [
            {
              name: "MapView.jsx",
              type: "file",
              lastCommit: "Fix zoom controls",
              timestamp: "3d ago",
            },
            {
              name: "LayerPanel.jsx",
              type: "file",
              lastCommit: "Add layer opacity slider",
              timestamp: "5d ago",
            },
            {
              name: "CoordinateDisplay.jsx",
              type: "file",
              lastCommit: "Support multiple coordinate systems",
              timestamp: "1w ago",
            },
          ],
        },
        {
          name: "hooks",
          type: "folder",
          lastCommit: "Add useMapLayers hook",
          timestamp: "1w ago",
          children: [
            {
              name: "useMapState.js",
              type: "file",
              lastCommit: "Add bounds tracking",
              timestamp: "1w ago",
            },
            {
              name: "useGeolocation.js",
              type: "file",
              lastCommit: "Improve accuracy options",
              timestamp: "2w ago",
            },
          ],
        },
        {
          name: "utils",
          type: "folder",
          lastCommit: "Add projection utilities",
          timestamp: "2w ago",
          children: [
            {
              name: "projections.js",
              type: "file",
              lastCommit: "Add UTM support",
              timestamp: "2w ago",
            },
            {
              name: "formatters.js",
              type: "file",
              lastCommit: "Add DMS formatter",
              timestamp: "3w ago",
            },
          ],
        },
        {
          name: "App.jsx",
          type: "file",
          lastCommit: "Update map container",
          timestamp: "2d ago",
        },
        {
          name: "index.js",
          type: "file",
          lastCommit: "Add strict mode",
          timestamp: "1m ago",
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      lastCommit: "Add basemap tiles",
      timestamp: "2w ago",
      children: [
        {
          name: "basemaps",
          type: "folder",
          lastCommit: "Add satellite imagery",
          timestamp: "2w ago",
          children: [
            {
              name: "satellite.png",
              type: "file",
              lastCommit: "Compress image",
              timestamp: "2w ago",
            },
            {
              name: "terrain.png",
              type: "file",
              lastCommit: "Update terrain style",
              timestamp: "3w ago",
            },
          ],
        },
        {
          name: "favicon.ico",
          type: "file",
          lastCommit: "Update favicon design",
          timestamp: "2w ago",
        },
        {
          name: "logo.svg",
          type: "file",
          lastCommit: "Optimize SVG",
          timestamp: "1m ago",
        },
      ],
    },
    {
      name: "data",
      type: "folder",
      lastCommit: "Add sample datasets",
      timestamp: "1w ago",
      children: [
        {
          name: "countries.geojson",
          type: "file",
          lastCommit: "Update country boundaries",
          timestamp: "1w ago",
        },
        {
          name: "cities.geojson",
          type: "file",
          lastCommit: "Add population data",
          timestamp: "2w ago",
        },
        {
          name: "rivers.geojson",
          type: "file",
          lastCommit: "Fix river geometries",
          timestamp: "3w ago",
        },
        {
          name: "elevation.tif",
          type: "file",
          lastCommit: "Update DEM resolution",
          timestamp: "1m ago",
        },
        {
          name: "landcover.shp",
          type: "file",
          lastCommit: "Add classification attributes",
          timestamp: "2m ago",
        },
      ],
    },
    {
      name: ".github",
      type: "folder",
      lastCommit: "Update CI workflow",
      timestamp: "2w ago",
      children: [
        {
          name: "workflows",
          type: "folder",
          lastCommit: "Add deployment workflow",
          timestamp: "2w ago",
          children: [
            {
              name: "ci.yml",
              type: "file",
              lastCommit: "Fix test command",
              timestamp: "2w ago",
            },
            {
              name: "deploy.yml",
              type: "file",
              lastCommit: "Add production deployment",
              timestamp: "2w ago",
            },
          ],
        },
        {
          name: "CODEOWNERS",
          type: "file",
          lastCommit: "Add GIS team",
          timestamp: "1m ago",
        },
      ],
    },
    {
      name: ".gitignore",
      type: "file",
      lastCommit: "Ignore large datasets",
      timestamp: "3m ago",
    },
    {
      name: "README.md",
      type: "file",
      lastCommit: "Add projection documentation",
      timestamp: "1d ago",
    },
    {
      name: "package.json",
      type: "file",
      lastCommit: "Add turf.js dependency",
      timestamp: "5d ago",
    },
    {
      name: "LICENSE",
      type: "file",
      lastCommit: "Switch to MIT license",
      timestamp: "6m ago",
    },
    {
      name: "CONTRIBUTING.md",
      type: "file",
      lastCommit: "Update contribution guidelines",
      timestamp: "2m ago",
    },
  ],
}

export default function RepoPage() {
  return (
    <div className="bg-github-canvas text-github-fg min-h-screen">
      <RepositoryViewer repoData={sampleRepoData} />
    </div>
  )
}

