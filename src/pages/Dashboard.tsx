
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, User, Bot, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to your Dashboard!",
      description: "You've successfully set up all integrations.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <header className="w-full py-6 flex justify-center">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Marguru Dashboard
          </h1>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto mt-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-indigo-500" />
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">No clients yet</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">No appointments yet</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bot className="h-5 w-5 mr-2 text-indigo-500" />
                Bot Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium flex items-center text-green-600">
                <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                Active
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Your dashboard is being set up</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              Your Marguru bot is now connected to all your services. 
              Soon you'll see your client data, appointments, and analytics here.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
