"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react"

const projects = [
  { id: 'PRJ-1029', name: 'Metro Expansion Line A', location: 'New York, NY', manager: 'Sarah Jenkins', status: 'High Risk', progress: 45, date: '2025-10-15' },
  { id: 'PRJ-1030', name: 'Downtown Bridge Repair', location: 'Chicago, IL', manager: 'Michael Chang', status: 'On Track', progress: 82, date: '2024-08-20' },
  { id: 'PRJ-1031', name: 'Coastal Highway Phase 2', location: 'Miami, FL', manager: 'David Rodriguez', status: 'At Risk', progress: 15, date: '2026-03-10' },
  { id: 'PRJ-1032', name: 'Central Park Reservoir', location: 'New York, NY', manager: 'Sarah Jenkins', status: 'On Track', progress: 95, date: '2024-05-01' },
  { id: 'PRJ-1033', name: 'International Airport T3', location: 'Los Angeles, CA', manager: 'Emily Chen', status: 'High Risk', progress: 30, date: '2027-01-15' },
  { id: 'PRJ-1034', name: 'High-Speed Rail Sec 4', location: 'Dallas, TX', manager: 'Robert Taylor', status: 'On Track', progress: 60, date: '2025-11-30' },
]

export default function ProjectsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and monitor all civil engineering projects.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Active Projects</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-9 bg-muted/50" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium border-b">
                  <tr>
                    <th className="px-4 py-3">Project Name</th>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Manager</th>
                    <th className="px-4 py-3">Status Prediction</th>
                    <th className="px-4 py-3">Progress</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((project) => (
                    <tr key={project.id} className="bg-card hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{project.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{project.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{project.location}</td>
                      <td className="px-4 py-3 text-muted-foreground">{project.manager}</td>
                      <td className="px-4 py-3">
                        <Badge variant={
                          project.status === 'High Risk' ? 'destructive' :
                          project.status === 'At Risk' ? 'warning' : 'success'
                        }>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full max-w-[100px] bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${project.progress > 80 ? 'bg-success' : project.progress < 40 ? 'bg-danger' : 'bg-primary'}`} 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">Showing 1 to 6 of 1,248 entries</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
