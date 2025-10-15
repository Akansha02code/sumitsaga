"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  MapPin,
  Clock,
  ArrowLeft,
  Heart,
  X,
  MessageSquare,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

// Fort data
const fortsData = [
  { id: 1, name: "Lohgad Fort", region: "Pune", image: "/Lohagad.jpg", difficulty: "Easy", duration: "4-5 hours", description: "A magnificent hill fort with rich Maratha history and stunning valley views.", elevation: "1,033m" },
  { id: 2, name: "Visapur Fort", region: "Pune", image: "/visapur fort.jpeg", difficulty: "Moderate", duration: "3-4 hours", description: "Twin fort of Lohgad, known for its massive stone structures and caves.", elevation: "1,084m" },
  { id: 3, name: "Korigad Fort", region: "Pune", image: "/korigad.jpg", difficulty: "Moderate", duration: "3-4 hours", description: "A scenic fort offering panoramic views of Aamby Valley and surrounding hills.", elevation: "923m" },
  { id: 4, name: "Tikona Fort", region: "Pune", image: "/Tikona.jpeg", difficulty: "Moderate", duration: "4-5 hours", description: "Triangular-shaped fort famous for its unique architecture and trekking trails.", elevation: "1,033m" },
  { id: 5, name: "Kalavantin Durg", region: "Raigad", image: "/kalavanti.jpeg", difficulty: "Difficult", duration: "3-4 hours", description: "A cliff-top fortress known for its steep rock-cut steps and adventurous trek.", elevation: "701m" },
  { id: 6, name: "Prabalgad Fort", region: "Raigad", image: "/prabalgad.jpg", difficulty: "Moderate", duration: "4-5 hours", description: "A hill fort located between Matheran and Panvel, known for its historical significance and expansive plateau.", elevation: "700m" },
  { id: 7, name: "Sindhudurg Fort", region: "Kokan", image: "/sindhudurg.jpg", difficulty: "Easy", duration: "1-2 hours", description: "A sea fort built by Chhatrapati Shivaji Maharaj to protect the Konkan coastline from naval attacks.", elevation: "Sea level" },
  { id: 8, name: "Vijaydurg Fort", region: "Kokan", image: "/vijaydurg.jpg", difficulty: "Easy to Moderate", duration: "2-3 hours", description: "One of the oldest and strongest coastal forts, known for its triple-layered walls and naval history.", elevation: "Sea level" },
];

const regions = ["All Regions", "Kokan", "Raigad", "Pune"];
const categories = ["All", "Easy", "Moderate", "Difficult"];

// ChatGroup Type
type ChatGroup = { id: number; name: string; type: "Fort" | "Region" | "Custom"; relatedEntity: string; members: number };

// Initial groups per fort
const initialGroups: ChatGroup[] = fortsData.map((fort, index) => ({
  id: index + 100,
  name: `${fort.name} Trek Talk`,
  type: "Fort",
  relatedEntity: fort.name,
  members: 10 + index * 2,
}));

const SearchPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredForts, setFilteredForts] = useState(fortsData);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const router = useRouter();

  // Chat state
  const [allChatGroups, setAllChatGroups] = useState<ChatGroup[]>(initialGroups);
  const [myChatGroups, setMyChatGroups] = useState<number[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Community Chat state
  const [communityMessages, setCommunityMessages] = useState([
    { sender: "Admin", text: "Welcome to the Community Chat!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Wishlist toggle
  const toggleWishlist = (fortId: number) => {
    setWishlist(prev => prev.includes(fortId) ? prev.filter(id => id !== fortId) : [...prev, fortId]);
  };

  // Chat send
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setCommunityMessages(prev => [...prev, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  // Search filters
  const handleSearch = () => {
    let results = fortsData;
    if (selectedRegion !== "All Regions") results = results.filter(f => f.region === selectedRegion);
    if (selectedCategory !== "All") results = results.filter(f => f.difficulty === selectedCategory);
    setFilteredForts(results);
  };

  const handleFortClick = (fortId: number) => router.push(`/fort/${fortId}`);

  const wishlistForts = fortsData.filter(f => wishlist.includes(f.id));
  const joinedGroups = allChatGroups.filter(g => myChatGroups.includes(g.id));
  const discoverGroups = allChatGroups.filter(g => !myChatGroups.includes(g.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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

          {/* Community Chat & Wishlist */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => { setIsChatOpen(!isChatOpen); setIsWishlistOpen(false); }}
            >
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span>Community Chat</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => { setIsWishlistOpen(!isWishlistOpen); setIsChatOpen(false); }}
            >
              <Heart className="h-4 w-4 text-red-500" />
              <span>Wishlist ({wishlist.length})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Community Chat Drawer */}
      {isChatOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-lg z-50 p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span>Community Chat</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-2">
            {communityMessages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5 text-primary mt-1" />
                <div>
                  <span className="font-semibold text-[#FFD6A5]">{msg.sender}:</span>
                  <span className="text-white ml-1">{msg.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex mt-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1 mr-2"
              onKeyDown={e => { if (e.key === "Enter") handleSendMessage(); }}
            />
            <Button style={{ background: "#FFD6A5", color: "#232323" }} onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-lg z-50 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>My Wishlist</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsWishlistOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {wishlistForts.length > 0 ? (
            <div className="space-y-4">
              {wishlistForts.map(f => (
                <Card key={f.id} className="border-border">
                  <div className="flex items-center space-x-3 p-3">
                    <img src={f.image} alt={f.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.region}</p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); toggleWishlist(f.id); }}>
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
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Discover Maharashtra Forts
            </h2>
            <p className="text-muted-foreground text-pretty">
              Explore historic forts across different regions of Maharashtra
            </p>
          </div>

          {/* Filters */}
          <Card className="border-border text-muted-foreground">
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
                  <label className="text-sm font-medium text-muted-foreground">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">Search Forts</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fort Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Found {filteredForts.length} fort{filteredForts.length !== 1 ? "s" : ""}
              </h3>
              <Badge variant="secondary" className="text-sm">{selectedRegion}</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForts.map(fort => (
                <Card key={fort.id} className="border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg group" onClick={() => handleFortClick(fort.id)}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img src={fort.image || "/placeholder.svg"} alt={fort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 right-3">
                      <Button size="icon" variant="ghost" className={`rounded-full ${wishlist.includes(fort.id) ? "text-red-500" : "text-gray-400"}`} onClick={e => { e.stopPropagation(); toggleWishlist(fort.id); }}>
                        <Heart className={`h-5 w-5 ${wishlist.includes(fort.id) ? "fill-red-500" : ""}`} />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">{fort.elevation}</Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-extrabold text-[#FFD6A5] tracking-wide drop-shadow-md">{fort.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />{fort.region}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-pretty mb-4">{fort.description}</CardDescription>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />{fort.duration}
                      </div>
                      <Badge variant={fort.difficulty === "Easy" ? "secondary" : "outline"} className="text-xs">{fort.difficulty}</Badge>
                    </div>
                    <Button size="sm" className="mt-3 flex items-center font-semibold text-[#232323] bg-[#FFD6A5] hover:bg-[#ffcc80] hover:scale-[1.03] transition-all shadow-md" onClick={e => { e.stopPropagation(); router.push(`/chat/${fort.id}`); }}>
                      <MessageSquare className="h-4 w-4 mr-1 text-[#232323]" /> Chat Planning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
