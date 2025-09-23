"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Mountain, Users, CalendarIcon, ArrowLeft, MapPin, Clock, Plus, UserPlus } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Sample existing groups data
const existingGroups = [
  {
    id: 1,
    name: "Lohgad Weekend Warriors",
    fortName: "Lohgad Fort",
    fortId: 1,
    date: "2024-01-15",
    members: 8,
    maxMembers: 12,
    organizer: "Rahul Patil",
    description: "Early morning trek to catch the sunrise from Lohgad. Perfect for beginners!",
    difficulty: "Moderate",
    meetingPoint: "Lohgad Base Village",
    meetingTime: "06:00 AM",
  },
  {
    id: 2,
    name: "Visapur Explorers",
    fortName: "Visapur Fort",
    fortId: 2,
    date: "2024-01-20",
    members: 5,
    maxMembers: 10,
    organizer: "Priya Sharma",
    description: "Exploring the ancient caves and rock structures of Visapur Fort.",
    difficulty: "Easy",
    meetingPoint: "Visapur Base Village",
    meetingTime: "07:00 AM",
  },
  {
    id: 3,
    name: "Tikona Challenge",
    fortName: "Tikona Fort",
    fortId: 4,
    date: "2024-01-25",
    members: 6,
    maxMembers: 8,
    organizer: "Amit Desai",
    description: "Challenging trek to the triangular fort. For experienced trekkers only.",
    difficulty: "Moderate",
    meetingPoint: "Tikona Base Village",
    meetingTime: "05:30 AM",
  },
]

const fortsData: Record<string, string> = {
  "1": "Lohgad Fort",
  "2": "Visapur Fort",
  "3": "Korigad Fort",
  "4": "Tikona Fort",
  "5": "Kalawantin Durg",
  "6": "Prabalgad Fort",
}

export default function GroupPage() {
  const [selectedFort, setSelectedFort] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")
  const [maxMembers, setMaxMembers] = useState("10")
  const [meetingPoint, setMeetingPoint] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Get fort ID from URL params if coming from fort details page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const fortId = urlParams.get("fort")
    if (fortId && fortsData[fortId]) {
      setSelectedFort(fortId)
    }
  }, [])

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate group creation
    setTimeout(() => {
      setIsCreating(false)
      alert("Group created successfully! You'll be redirected to the group page.")
      // Reset form
      setGroupName("")
      setDescription("")
      setSelectedDate(undefined)
      setMeetingPoint("")
      setMeetingTime("")
    }, 2000)
  }

  const handleJoinGroup = (groupId: number) => {
    alert(`Successfully joined the group! You'll receive further details via email.`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Mountain className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Forts Explorer</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">Group Management</h2>
            <p className="text-muted-foreground text-pretty">
              Create a new group or join existing ones to explore forts together
            </p>
          </div>

          {/* Tabs for Create/Join */}
          <Card className="border-border">
            <CardContent className="p-6">
              <Tabs defaultValue="join" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="join" className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join a Group
                  </TabsTrigger>
                  <TabsTrigger value="create" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Group
                  </TabsTrigger>
                </TabsList>

                {/* Join Existing Groups */}
                <TabsContent value="join" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Available Groups</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {existingGroups.map((group) => (
                        <Card key={group.id} className="border-border hover:border-primary/50 transition-colors">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">{group.name}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Mountain className="h-3 w-3 mr-1" />
                                  {group.fortName}
                                </div>
                              </div>
                              <Badge variant={group.difficulty === "Easy" ? "secondary" : "outline"}>
                                {group.difficulty}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <CardDescription className="text-pretty">{group.description}</CardDescription>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-muted-foreground">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  {format(new Date(group.date), "MMM dd, yyyy")}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {group.meetingTime}
                                </div>
                              </div>

                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {group.meetingPoint}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-muted-foreground">
                                  <Users className="h-3 w-3 mr-1" />
                                  {group.members}/{group.maxMembers} members
                                </div>
                                <span className="text-xs text-muted-foreground">by {group.organizer}</span>
                              </div>
                            </div>

                            <Separator />

                            <Button
                              onClick={() => handleJoinGroup(group.id)}
                              className="w-full"
                              disabled={group.members >= group.maxMembers}
                            >
                              {group.members >= group.maxMembers ? "Group Full" : "Join Group"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Create New Group */}
                <TabsContent value="create" className="space-y-6">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Create New Group</h3>

                    <form onSubmit={handleCreateGroup} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input
                            id="group-name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="e.g., Lohgad Weekend Warriors"
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fort-select">Select Fort</Label>
                          <select
                            id="fort-select"
                            value={selectedFort}
                            onChange={(e) => setSelectedFort(e.target.value)}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Choose a fort</option>
                            {Object.entries(fortsData).map(([id, name]) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe your group and what makes it special..."
                          required
                          className="bg-background min-h-[100px]"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Trek Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-background",
                                  !selectedDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="max-members">Max Members</Label>
                          <Input
                            id="max-members"
                            type="number"
                            value={maxMembers}
                            onChange={(e) => setMaxMembers(e.target.value)}
                            min="2"
                            max="20"
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="meeting-time">Meeting Time</Label>
                          <Input
                            id="meeting-time"
                            type="time"
                            value={meetingTime}
                            onChange={(e) => setMeetingTime(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meeting-point">Meeting Point</Label>
                        <Input
                          id="meeting-point"
                          value={meetingPoint}
                          onChange={(e) => setMeetingPoint(e.target.value)}
                          placeholder="e.g., Fort Base Village, Railway Station"
                          required
                          className="bg-background"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isCreating}>
                        {isCreating ? "Creating Group..." : "Create Group"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
