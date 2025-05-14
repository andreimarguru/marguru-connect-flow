
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Calendar, Check, Contacts, Drive, WhatsApp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IntegrationStepsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

const IntegrationSteps = ({ currentStep, onNext, onPrevious }: IntegrationStepsProps) => {
  const { toast } = useToast();
  
  const handleConnectService = (serviceName: string) => {
    toast({
      title: `Connecting to ${serviceName}`,
      description: "Please authorize access in the new window.",
    });
    
    // Simulating connection success
    setTimeout(() => {
      toast({
        title: `${serviceName} Connected!`,
        description: "Integration successful.",
        variant: "default",
      });
      onNext();
    }, 1500);
  };
  
  const calculateProgress = () => {
    return (currentStep / 4) * 100;
  };

  const stepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">Step 1: Google Drive</CardTitle>
              <CardDescription>
                Connect Google Drive to store and manage client documents, photos, and receipts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <Drive className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-slate-800">Google Drive Benefits</h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automatically store before/after client photos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Organize client documents and service records</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Access client history from anywhere</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => handleConnectService("Google Drive")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Connect Drive
                <Drive className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">Step 2: Google Calendar</CardTitle>
              <CardDescription>
                Connect Google Calendar to manage appointments and send reminders automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <Calendar className="h-8 w-8 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-slate-800">Google Calendar Benefits</h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automatic appointment scheduling via WhatsApp</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Send appointment reminders to clients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Sync with your existing calendar</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => handleConnectService("Google Calendar")}
                className="bg-red-500 hover:bg-red-600"
              >
                Connect Calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">Step 3: Google Contacts</CardTitle>
              <CardDescription>
                Connect Google Contacts to automatically manage client contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <Contacts className="h-8 w-8 text-indigo-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-slate-800">Google Contacts Benefits</h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automatically save new clients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Create client groups for targeted promotions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Track client preferences and history</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => handleConnectService("Google Contacts")}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                Connect Contacts
                <Contacts className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">Step 4: WhatsApp Business</CardTitle>
              <CardDescription>
                Connect WhatsApp Business API to enable automated client communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <WhatsApp className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-slate-800">WhatsApp Business Benefits</h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automated appointment confirmations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Personalized client communications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Send promotional messages to regular clients</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={() => handleConnectService("WhatsApp Business")}
                className="bg-green-600 hover:bg-green-700"
              >
                Connect WhatsApp
                <WhatsApp className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      default:
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-green-600">All Set!</CardTitle>
              <CardDescription className="text-base">
                You've successfully connected all services to Marguru.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-center">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 text-lg">Your Marguru bot is ready!</h3>
                  <p className="text-slate-600">
                    You can now use the full power of Marguru to manage your clients, appointments, and documents.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button 
                onClick={() => window.location.href = "/dashboard"} 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <h2 className="text-center text-slate-600 font-medium">
          Service Connection
        </h2>
        <Progress value={calculateProgress()} className="h-2" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>Step {currentStep} of 4</span>
          <span>{Math.round(calculateProgress())}% Complete</span>
        </div>
      </div>
      
      <Card className="w-full overflow-hidden shadow-lg border-0">
        {stepContent()}
      </Card>
    </div>
  );
};

export default IntegrationSteps;
