// // app/chat/[groupId]/page.tsx

// "use client";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// // Define the type for the dynamic route parameters
// type ChatPageProps = {
//   params: {
//     groupId: string; // The URL parameter will be a string
//   };
// };

// // This component will be the actual chat interface
// export default function ChatInterface({ params }: ChatPageProps) {
//   // Use the parameter to identify which chat group to load
//   const groupId = params.groupId;

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-3xl mx-auto">
//         <Link href="/forts">
//           <Button variant="outline" className="mb-6">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Fort Search
//           </Button>
//         </Link>

//         <h1 className="text-3xl font-bold mb-4">
//           Chat Interface for Group ID: {groupId}
//         </h1>
//         <p className="text-lg text-muted-foreground">
//           Welcome to the discussion! (This is a placeholder for your chat UI).
//         </p>

//         {/* Placeholder for the actual chat component */}
//         <div className="mt-8 h-96 border rounded-lg p-4 bg-white shadow-md flex items-center justify-center">
//           <p className="text-gray-400">
//             Start talking about your upcoming trek!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }