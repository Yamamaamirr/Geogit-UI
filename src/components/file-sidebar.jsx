'use client'

import React from 'react'
import { FileText, FolderOpen, Map, Plus, Search } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

// Sample data for map files
const mapFiles = [
  {
    title: 'Recent Files',
    items: [
      { id: 1, name: 'Downtown Map', type: 'map', isActive: true },
      { id: 2, name: 'City Center', type: 'map' },
      { id: 3, name: 'Residential Areas', type: 'map' },
    ]
  },
  {
    title: 'Saved Locations',
    items: [
      { id: 4, name: 'Office Buildings', type: 'folder' },
      { id: 5, name: 'Parks and Recreation', type: 'folder' },
      { id: 6, name: 'Transport Hubs', type: 'folder' },
    ]
  },
  {
    title: 'Shared with Me',
    items: [
      { id: 7, name: 'Team Project', type: 'map' },
      { id: 8, name: 'Client Presentation', type: 'document' },
    ]
  }
]

// Function to get the appropriate icon based on file type
const getFileIcon = (type) => {
  switch(type) {
    case 'map':
      return <Map className="h-4 w-4" />;
    case 'folder':
      return <FolderOpen className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

export default function FileSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h2 className="text-sm font-semibold">Map Files</h2>
          <button className="rounded-full p-1 hover:bg-gray-200">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search-files" className="sr-only">
                Search files
              </Label>
              <SidebarInput
                id="search-files"
                placeholder="Search files..."
                className="pl-8"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      
      <SidebarContent>
        {mapFiles.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href="#" className="flex items-center gap-2">
                        {getFileIcon(item.type)}
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

