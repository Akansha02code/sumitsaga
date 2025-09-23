"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mountain, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Fort data for Maharashtra
const fortsData = [
  {
    id: 1,
    name: "Lohgad Fort",
    region: "Pune",
    image: "/Lohagad.jpg",
    difficulty: "Easy",
    duration: "4-5 hours",
    description: "A magnificent hill fort with rich Maratha history and stunning valley views.",
    elevation: "1,033m",
  },
  {
    id: 2,
    name: "Visapur Fort",
    region: "Pune",
    image: "/visapur fort.jpeg",
    difficulty: "Moderate",
    duration: "3-4 hours",
    description: "Twin fort of Lohgad, known for its massive stone structures and caves.",
    elevation: "1,084m",
  },
  {
    id: 3,
    name: "Korigad Fort",
    region: "Pune",
    image: "/korigad.jpg",
    difficulty: "Moderate",
    duration: "3-4 hours",
    description: "A scenic fort offering panoramic views of Aamby Valley and surrounding hills.",
    elevation: "923m",
  },
  {
    id: 4,
    name: "Tikona Fort",
    region: "Pune",
    image: "/Tikona.jpeg",
    difficulty: "Moderate",
    duration: "4-5 hours",
    description: "Triangular-shaped fort famous for its unique architecture and trekking trails.",
    elevation: "1,033m",
  },
  {
    id: 5,
    name: "Kalavantin Durg",
    region: "Raigad",
    image: "/kalavanti.jpeg",
    difficulty: "Difficult",
    duration: "3-4 hours",
    description: "A cliff-top fortress known for its steep rock-cut steps and adventurous trek.",
    elevation: "701m",
  },
  {
    id: 6,
    name: "Prabalgad Fort",
    region: "Raigad",
    image: "/prabalgad.jpg",
    difficulty: "Moderate",
    duration: "4-5 hours",
    description: "A hill fort located between Matheran and Panvel, known for its historical significance and expansive plateau.",
    elevation: "700m",
  }
]

const regions = ["All Regions", "Konkan", "Raigad" , "Pune"]

export default function SearchPage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [filteredForts, setFilteredForts] = useState(fortsData)

  const handleSearch = () => {
    if (selectedRegion === "All Regions") {
      setFilteredForts(fortsData)
    } else {
      setFilteredForts(fortsData.filter((fort) => fort.region === selectedRegion))
    }
  }

  const handleFortClick = (fortId: number) => {
    window.location.href = `/fort/${fortId}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/welcome">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Mountain className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">SummitSaga</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">Discover Maharashtra Forts</h2>
            <p className="text-muted-foreground text-pretty">
              Explore historic forts across different regions of Maharashtra
            </p>
          </div>

          {/* Filters */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Search Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">State</label>
                  <Select value="Maharashtra" disabled>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    Search Forts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Found {filteredForts.length} fort{filteredForts.length !== 1 ? "s" : ""}
              </h3>
              <Badge variant="secondary" className="text-sm">
                {selectedRegion}
              </Badge>
            </div>

            {/* Fort Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForts.map((fort) => (
                <Card
                  key={fort.id}
                  className="border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg group"
                  onClick={() => handleFortClick(fort.id)}
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={fort.image || "/placeholder.svg"}
                      alt={fort.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {fort.elevation}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {fort.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {fort.region}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-pretty mb-4">{fort.description}</CardDescription>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {fort.duration}
                      </div>
                      <Badge variant={fort.difficulty === "Easy" ? "secondary" : "outline"} className="text-xs">
                        {fort.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            

            {filteredForts.length === 0 && (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <Mountain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No forts found</h3>
                  <p className="text-muted-foreground text-pretty">
                    Try selecting a different region to discover more forts.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
