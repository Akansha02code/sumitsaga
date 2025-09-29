"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mountain, MapPin, Clock, ArrowLeft, Heart, X } from "lucide-react"
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
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const toggleWishlist = (fortId: number) => {
    setWishlist((prev) =>
      prev.includes(fortId) ? prev.filter((id) => id !== fortId) : [...prev, fortId]
    )
  }

  const wishlistForts = fortsData.filter((fort) => wishlist.includes(fort.id))

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

            {/* Wishlist Button */}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => setIsWishlistOpen(!isWishlistOpen)}
            >
              <Heart className="h-4 w-4 text-red-500" />
              <span>Wishlist ({wishlist.length})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-lg z-50 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" /> <span>My Wishlist</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsWishlistOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {wishlistForts.length > 0 ? (
            <div className="space-y-4">
              {wishlistForts.map((fort) => (
                <Card key={fort.id} className="border-border">
                  <div className="flex items-center space-x-3 p-3">
                    <img
                      src={fort.image}
                      alt={fort.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{fort.name}</p>
                      <p className="text-sm text-muted-foreground">{fort.region}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => toggleWishlist(fort.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <p>No forts in wishlist</p>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
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

                    {/* Wishlist Heart Button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`rounded-full ${wishlist.includes(fort.id) ? "text-red-500" : "text-gray-400"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(fort.id)
                        }}
                      >
                        <Heart className={`h-5 w-5 ${wishlist.includes(fort.id) ? "fill-red-500" : ""}`} />
                      </Button>
                    </div>

                    <div className="absolute top-3 left-3">
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
