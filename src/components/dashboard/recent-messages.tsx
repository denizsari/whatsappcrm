import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Clock, Phone } from "lucide-react"

interface Message {
  id: string
  customerName: string
  customerPhone: string
  content: string
  timestamp: string
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT"
  isRead: boolean
  type: "INCOMING" | "OUTGOING" | "AUTOMATED"
}

interface RecentMessagesProps {
  messages: Message[]
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "destructive"
      case "HIGH":
        return "warning"
      case "NORMAL":
        return "secondary"
      case "LOW":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "INCOMING":
        return "📥"
      case "OUTGOING":
        return "📤"
      case "AUTOMATED":
        return "🤖"
      default:
        return "💬"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `${minutes} dakika önce`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} saat önce`
    } else {
      return date.toLocaleDateString('tr-TR')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Son Mesajlar
        </CardTitle>
        <CardDescription>
          Son gelen müşteri mesajları ve otomatik yanıtlar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Henüz mesaj bulunmuyor</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  message.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={message.customerName} />
                  <AvatarFallback className="text-xs">
                    {message.customerName?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">
                        {message.customerName || "Bilinmeyen Müşteri"}
                      </p>
                      <span className="text-lg">{getTypeIcon(message.type)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(message.priority) as any} className="text-xs">
                        {message.priority}
                      </Badge>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mt-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{message.customerPhone}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {message.content}
                  </p>
                  
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {messages.length > 0 && (
          <div className="mt-4 text-center">
            <a
              href="/dashboard/messages"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Tüm mesajları görüntüle →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
