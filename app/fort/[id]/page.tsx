"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mountain, MapPin, Clock, Users, ArrowLeft, Calendar, Ruler, Info, Map } from "lucide-react"
import Link from "next/link"

// Detailed fort data
const fortsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Lohgad Fort",
    region: "Pune",
    image: "/Lohagad.jpg",
    difficulty: "Easy",
    duration: "4-5 hours",
    elevation: "1,033m",
    builtBy: "Chhatrapati Shivaji Maharaj",
    builtYear: "1648 CE",
    description: "A magnificent hill fort with rich Maratha history and stunning valley views.",
    history:
      "Lohagad has a long history with several dynasties occupying it at different periods of time: Satavahanas, Chalukyas, Rashtrakutas, Yadavas, Bahamanis, Nizams, Mughals and Marathas. Chatrapati Shivaji Maharaj captured it in 1648 AD, but he was forced to surrender it to the Mughals in 1665 AD by the Treaty of Purandar. Chatrapati Shivaji Maharaj recaptured the fort in 1670 AD and used it for keeping his treasury. This fort was used to keep the winnings from Surat. Later in Peshwa time Nana Phadnavis used this fort for living for some time and built several structures in the fort such as a big tank and a step-well.",

    features: [
      "Vinchu Kada (Scorpion's Tail) - unique architectural feature",
      "Ancient water cisterns and granaries",
      "Ganesh Darwaja - the main entrance gate",
      "Lohgad caves with maratha history",
      "Panoramic views of Pawna Dam and Sahyadri ranges",
    ],
    bestTime: "October to March",
    trekDistance: "2.5 km from base village & 6-7 km from lonavla St",
    coordinates: { lat: 18.7108, lng: 73.4855 },
  },
  "2": {
    id: 2,
    name: "Visapur Fort",
    region: "Pune",
    image: "/visapur fort.jpeg",
    difficulty: "Moderate",
    duration: "3-4 hours",
    elevation: "1,084m",
    builtBy: "Chhatrapati Shivaji Maharaj",
    builtYear: "1713 CE",
    description: "Twin fort of Lohgad, known for its massive stone structures and caves.",
    history:
      "Visapur Fort stands as the twin fort to Lohgad, built later in 1713 during the Maratha period. This fort is renowned for its impressive rock-cut architecture and ancient caves that served as shelter for soldiers and storage for supplies. The fort's strategic position complemented Lohgad's defensive capabilities, creating a formidable dual-fort system. Visapur is particularly famous for its massive stone structures, some of which are carved directly into the mountain rock. The fort also houses several ancient water tanks and has remnants of old residential quarters.",
    features: [
      "Ancient rock-cut caves and chambers",
      "Massive stone structures and walls",
      "Natural water tanks carved in rock",
      "Remnants of old residential quarters",
      "Spectacular sunrise and sunset views",
      "Multiple trekking routes to the top",
    ],
    bestTime: "October to March",
    trekDistance: "1.5 km from base village & 5-6 km from lonavla St",
    coordinates: { lat: 18.7156, lng: 73.4889 },
  },
  "3": {
    id: 3,
    name: "Korigad Fort",
    region: "Pune",
    image: "/korigad.jpg",
    difficulty: "Moderate",
    duration: "3-4 hours",
    elevation: "923m",
    builtBy: "Chhatrapati Shivaji Maharaj",
    builtYear: "1657 CE",
    description: "A scenic fort offering panoramic views of Aamby Valley and surrounding hills.",
    history:
      "Korigad Fort, also known as Koraigad (कोराईगड), was built in 1657 and served as an important watchtower for the Maratha Empire. The fort's name is derived from 'Kori' meaning door or gate, as it served as a gateway to the Sahyadri mountain range. This fort is unique for its well-preserved architecture and the famous Korai Devi (कोराई देवी) temple located at its summit. The fort offers breathtaking views of the Aamby Valley, Lonavala, and the surrounding Western Ghats. During the monsoon season, the fort is surrounded by lush greenery and numerous waterfalls.",
    features: [
      "Korai Devi temple at the summit",
      "Well-preserved fort walls and bastions",
      "Ancient water cisterns and storage rooms",
      "Panoramic views of Aamby Valley",
      "Multiple trekking routes to the top",
    ],
    bestTime: "October to March",
    trekDistance: "3 km from base village",
    coordinates: { lat: 18.7667, lng: 73.4833 },
  },
  "4": {
    id: 4,
    name: "Tikona Fort",
    region: "Pune",
    image: "/Tikona.jpeg",
    difficulty: "Moderate",
    duration: "4-5 hours",
    elevation: "1,033m",
    builtBy: "Chhatrapati Shivaji Maharaj",
    builtYear: "1650 CE",
    description: "Triangular-shaped fort famous for its unique architecture and trekking trails.",
    history:
      "Tikona Fort, meaning 'Triangle Fort', gets its name from its distinctive triangular shape when viewed from the base. Built in 1650, this fort is one of the most architecturally unique forts in Maharashtra. The fort served as a crucial observation post for the Maratha Empire, providing surveillance over the trade routes between the coast and the Deccan plateau. The fort is famous for its challenging trek that includes steep rock patches and narrow ridges. At the summit, trekkers are rewarded with a small temple dedicated to Trimbakeshwar and spectacular 360-degree views of the surrounding landscape.",
    features: [
      "Unique triangular shape and architecture",
      "Trimbakeshwar temple at the summit",
      "Challenging rock climbing sections",
      "360-degree panoramic views",
      "Ancient fortification walls and gates",
    ],
    bestTime: "October to March",
    trekDistance: "2 km from base village",
    coordinates: { lat: 18.6333, lng: 73.4833 },
  },
  "5":{
    id: 5,
    name: "Kalavantin Durg",
    region: "Raigad",
    image: "/kalavanti.jpeg",
    difficulty: "Difficult",
    duration: "3-4 hours",
    elevation: "701m",
    builtBy: "Satavahana Dynasty",
    builtYear: "2nd century BCE",
    description: "A cliff-top fortress known for its steep rock-cut steps and adventurous trek.",
    history:
      "Kalavantin Durg, perched next to Prabalgad Fort, is believed to have been constructed during the rule of the Satavahana dynasty around the 2nd century BCE. The fort is named after Queen Kalavantin, though little is documented about her. It was primarily used as a watchtower due to its strategic location overseeing the Mumbai-Pune trade route. The trek to the fort is considered one of the most thrilling in Maharashtra, with near-vertical rock-cut steps and no protective railings, making it a challenging climb. At the top, trekkers are rewarded with breathtaking views of Prabalgad, Matheran, Karnala Fort, and the surrounding Sahyadris.",
    features: [
      "Steep rock-cut steps with no railings",
      "Panoramic views of Prabalgad, Matheran, and Karnala",
      "Strategic watchtower location",
      "Thrilling and adventurous trek",
      "Ancient rock fortifications"
    ],
    bestTime: "October to February",
    trekDistance: "3 km from base village Thakurwadi",
    coordinates: { lat: 18.9698, lng: 73.2172 },
  },
  "6":{
    id: 6,
    name: "Prabalgad Fort",
    region: "Raigad",
    image: "/prabalgad.jpg",
    difficulty: "Moderate",
    duration: "4-5 hours",
    elevation: "700m",
    builtBy: "Bahmani Sultanate",
    builtYear: "15th century CE",
    description: "A hill fort located between Matheran and Panvel, known for its historical significance and expansive plateau.",
    history:
      "Prabalgad Fort, originally known as Muranjan, was built during the Bahmani Sultanate in the 15th century. It later came under the control of the Ahmadnagar Sultanate before being captured by the Marathas under Chhatrapati Shivaji Maharaj in 1657. The fort occupies a large plateau and was strategically important for controlling the trade routes between Panvel and the Deccan plateau. Unlike its neighbor Kalavantin Durg, Prabalgad has wider pathways and fortifications, making it less dangerous to climb. The summit offers stunning views of Kalavantin Durg, Matheran range, Karnala, and the vast landscapes of the Sahyadris.",
    features: [
      "Expansive plateau with ruins of fortifications",
      "Historic gateways and bastions",
      "Viewpoints overlooking Kalavantin Durg and Matheran",
      "Strategic location controlling Panvel trade routes",
      "Remains of ancient water cisterns"
    ],
    bestTime: "October to February",
    trekDistance: "3.5 km from base village Thakurwadi",
    coordinates: { lat: 18.9702, lng: 73.2233 },
  }
}

const difficultyPrecautions: Record<string, string[]> = {
  Easy: [
    "Wear good-grip shoes; avoid slippery edges in monsoon",
    "Carry 1–2L water and light snacks",
    "Basic sun protection (cap, sunscreen)",
  ],
  Moderate: [
    "Start early; routes can be long and exposed",
    "Carry 2–3L water + electrolytes; trekking pole recommended",
    "Check weather and avoid heavy rain/wind",
  ],
  Hard: [
    "Experienced trekkers recommended; route finding can be tricky",
    "Carry 3–4L water, headlamp, first-aid kit, emergency blanket",
    "Avoid windy cliff edges and loose rock; go with a group/guide",
  ],
}

export default function FortDetailsPage({ params }: { params: { id: string } }) {
  const [showFullHistory, setShowFullHistory] = useState(false)
  const fort = fortsData[params.id]

  if (!fort) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <Mountain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Fort not found</h3>
            <p className="text-muted-foreground mb-4">The fort you're looking for doesn't exist.</p>
            <Link href="/search">
              <Button>Back to Search</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCreateGroup = () => {
    window.location.href = `/groups?fort=${fort.id}`
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image and Title */}
            <Card className="border-border overflow-hidden">
              <div className="aspect-video relative">
                <img src={fort.image || "/placeholder.svg"} alt={fort.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2 text-balance">{fort.name}</h1>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {fort.region}
                    </div>
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 mr-1" />
                      {fort.elevation}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Info */}
            <div className="grid md:grid-cols-4 gap-4">
              {/* Duration, Difficulty, Best Time, Trek Distance Cards */}
              {/* Same as original code */}
            </div>

            {/* History Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  History & Significance
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Built by: {fort.builtBy}</span>
                  <span>•</span>
                  <span>Year: {fort.builtYear}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  {showFullHistory ? fort.history : `${fort.history.substring(0, 300)}...`}
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => setShowFullHistory(!showFullHistory)}
                >
                  {showFullHistory ? "Show Less" : "Read More"}
                </Button>
              </CardContent>
            </Card>

            {/* Features Card */}
            {/* Same as original code */}

            {/* Precautions Card */}
            {/* Same as original code */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Card */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground">
                      Lat: {fort.coordinates?.lat}, Lng: {fort.coordinates?.lng}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    const query = fort.coordinates
                      ? `${fort.coordinates.lat},${fort.coordinates.lng}`
                      : encodeURIComponent(fort.location || fort.name)
                    window.open(`https://www.google.com/maps?q=${query}`, "_blank")
                  }}
                >
                  Open in Maps
                </Button>
              </CardContent>
            </Card>

            {/* Group Action Card */}
            {/* Same as original code */}

            {/* Fort Statistics Card */}
            {/* Same as original code */}
          </div>
        </div>
      </div>
    </div>
  )
}