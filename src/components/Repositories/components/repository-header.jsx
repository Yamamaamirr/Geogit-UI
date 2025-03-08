"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { GitBranch, GitCommit, Users, Copy, Check, Code, Star, Eye, GitFork, Map, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"


export const RepositoryHeader = ({ name, description, stats }) => {
  const [copied, setCopied] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState("main")
  const [watching, setWatching] = useState(false)
  const [starred, setStarred] = useState(false)
  const [forked, setForked] = useState(false)

  const branches = ["main", "develop", "feature/geojson-support", "fix/projection-issue"]

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://github.com/geospatial/${name}.git`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border-b border-github-border bg-github-canvas">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Map className="w-5 h-5 text-github-fgMuted" />
          <h1 className="text-xl font-semibold flex items-center">
            <span className="text-github-fgMuted hover:text-github-accent transition-colors cursor-pointer">
              geospatial
            </span>
            <span className="mx-1 text-github-fgMuted">/</span>
            <span className="text-github-fg hover:text-github-accent transition-colors cursor-pointer">{name}</span>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full border border-github-border text-github-fgMuted">
              Public
            </span>
          </h1>
        </div>

        {description && <p className="text-github-fgMuted mb-4 text-sm">{description}</p>}

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className={`gap-1 bg-github-navHighlight border-github-border hover:border-github-borderActive hover:bg-github-navHighlight hover:text-github-fg ${starred ? "bg-github-highlight border-github-borderActive" : ""}`}
            onClick={() => setStarred(!starred)}
          >
            <Star className={`w-4 h-4 ${starred ? "fill-github-fg" : ""}`} />
            {starred ? "Starred" : "Star"}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-md bg-github-navHighlight">123</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 bg-github-navHighlight border-github-border hover:border-github-borderActive hover:bg-github-navHighlight hover:text-github-fg ${watching ? "bg-github-highlight border-github-borderActive" : ""}`}
              >
                <Eye className="w-4 h-4" />
                {watching ? "Watching" : "Watch"}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-github-canvasSubtle border-github-border">
              <DropdownMenuItem
                onClick={() => setWatching(true)}
                className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg"
              >
                All Activity
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setWatching(false)}
                className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg"
              >
                Ignore
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className={`gap-1 bg-github-navHighlight border-github-border hover:border-github-borderActive hover:bg-github-navHighlight hover:text-github-fg ${forked ? "bg-github-highlight border-github-borderActive" : ""}`}
            onClick={() => setForked(!forked)}
          >
            <GitFork className="w-4 h-4" />
            {forked ? "Forked" : "Fork"}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-md bg-github-navHighlight">42</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-1 bg-github-navHighlight border-github-border text-github-fg hover:bg-github-navHighlight hover:border-github-borderActive hover:text-github-fg"
                >
                  <GitBranch className="w-4 h-4" />
                  {selectedBranch}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-github-canvasSubtle border-github-border">
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch}
                    onClick={() => setSelectedBranch(branch)}
                    className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg"
                  >
                    {branch}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-grow flex items-center gap-2 border rounded-md px-3 bg-github-navHighlight border-github-border">
              <Code className="w-4 h-4 text-github-fgMuted" />
              <span className="text-sm truncate text-github-fgMuted">https://github.com/geospatial/{name}.git</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto text-github-fgMuted hover:text-github-fg"
                onClick={handleCopy}
              >
                {copied ? <Check className="w-4 h-4 text-github-success" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="gap-1 bg-github-accent hover:bg-github-accent/90 text-white">
                <Code className="w-4 h-4" />
                Code
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-github-canvasSubtle border-github-border">
              <DropdownMenuItem className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg">
                Clone with HTTPS
              </DropdownMenuItem>
              <DropdownMenuItem className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg">
                Clone with SSH
              </DropdownMenuItem>
              <DropdownMenuItem className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg">
                Open with GitHub Desktop
              </DropdownMenuItem>
              <DropdownMenuItem className="text-github-fg hover:bg-github-navHighlight hover:text-github-fg">
                Download ZIP
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {stats && (
        <div className="flex overflow-x-auto border-t border-github-border scrollbar-hide">
          <div className="flex items-center gap-1 px-4 py-2 border-r border-github-border hover:bg-github-canvasSubtle transition-colors cursor-pointer">
            <GitBranch className="w-4 h-4 text-github-fgMuted" />
            <span className="text-sm">{stats.branches} branches</span>
          </div>
          <div className="flex items-center gap-1 px-4 py-2 border-r border-github-border hover:bg-github-canvasSubtle transition-colors cursor-pointer">
            <GitCommit className="w-4 h-4 text-github-fgMuted" />
            <span className="text-sm">{stats.commits} commits</span>
          </div>
          <div className="flex items-center gap-1 px-4 py-2 hover:bg-github-canvasSubtle transition-colors cursor-pointer">
            <Users className="w-4 h-4 text-github-fgMuted" />
            <span className="text-sm">{stats.contributors} contributors</span>
          </div>
        </div>
      )}
    </div>
  )
}

RepositoryHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  stats: PropTypes.shape({
    commits: PropTypes.number,
    branches: PropTypes.number,
    contributors: PropTypes.number,
  }),
}

