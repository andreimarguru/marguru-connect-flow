import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Scissors, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IntegrationSteps from "@/components/IntegrationSteps";
import ServiceIcons from "@/components/ServiceIcons";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "@/components/Auth/AuthButtons";
import AuthForm from "@/components/Auth/AuthForm";
import { useLocation } from "react-router-dom";
import ApiClient from "@/services/ApiClient";
import { useUserStore } from "@/store/userStore";

const Index = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [tokens, setTokens] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? Number(savedStep) : 0;
  });
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const apiClient = new ApiClient(
    getAccessTokenSilently,
    import.meta.env.REACT_APP_AUTH0_AUDIENCE,
    "read:data write:data"
  );

  const { setUserInfo } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("status") === "gmail_access_granted" && currentStep === 1) {
      setCurrentStep(2); // Move to WhatsApp step
      toast({
        title: "Google Connected!",
        description: "Google integration successful.",
        variant: "default",
      });
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.search, currentStep, toast]);

  useEffect(() => {
    localStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);
  const getUserIfno = async () => {
    if (!isAuthenticated || isLoading) return;
    try {
      const userInfo = await apiClient.get("/api/user/");
      setTokens(userInfo.user.tokens || []);
      setServices(userInfo.businessInfo?.services || []);
      setUserInfo(userInfo); // <-- Store globally
      console.log("User Info:", userInfo);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user information.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;
    const checkWhatsappIntegration = async () => {
      try {
        const userInfo = await apiClient.get("/api/user/");
        const hasWhatsapp = userInfo.tokens?.some(
          (token: any) => token.kind === "WHATSAPP"
        );
        if (hasWhatsapp && currentStep === 2) {
          setCurrentStep(3);
          toast({
            title: "WhatsApp Connected!",
            description: "WhatsApp integration successful.",
            variant: "default",
          });
        }
      } catch (error) {}
    };

    checkWhatsappIntegration();
  }, [isAuthenticated, isLoading, currentStep, apiClient, toast]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getUserIfno();
    }
  }, [isAuthenticated, isLoading, currentStep]);

  const handleConnectService = async (serviceName: string) => {
    if (serviceName === "Gmail") {
      try {
        const response = await apiClient.get("/api/gmail/connect");
        if (response.auth_url) {
          window.location.href = response.auth_url;
        } else {
          console.error("No auth_url returned from the backend");
        }
      } catch (error) {
        console.error("Failed to connect Gmail integration:", error);
      }
    } else if (serviceName === "WhatsApp") {
      try {
        const response = await apiClient.get("/api/whatsapp/connect");
        if (response.auth_url) {
          window.location.href = response.auth_url;
        } else {
          console.error("No auth_url returned from the backend");
        }
      } catch (error) {
        console.error("Failed to connect WhatsApp integration:", error);
      }
    }
  };
  const handleStart = () => {
    setCurrentStep(1);
    toast({
      title: "Welcome to Marguru!",
      description:
        "Let's set up your integrations to supercharge your business.",
    });
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0);
    }
  };

  const rtlClass = isRTL ? "rtl" : "";

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 ${rtlClass}`}
    >
      {/* Header */}
      <header className="w-full p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Marguru
          </h1>
          <LoginButton />
          <LogoutButton />
        </div>
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!isAuthenticated && !isLoading ? (
          <AuthForm />
        ) : (
          <>
            {currentStep === 0 ? (
              <Card className="max-w-md w-full overflow-hidden shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                  <CardTitle className="text-2xl font-bold">
                    {t("welcome")}
                  </CardTitle>
                  <CardDescription className="text-indigo-100">
                    {t("description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 px-6">
                  <div className="space-y-4">
                    <p className="text-slate-700">{t("connectServices")}</p>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Scissors className="h-5 w-5 text-indigo-500" />
                      <span>{t("hairdressers")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Bot className="h-5 w-5 text-indigo-500" />
                      <span>{t("serviceProfs")}</span>
                    </div>
                    <p className="text-slate-700 pt-2">
                      {t("connectServices")}
                    </p>
                  </div>
                  <ServiceIcons />
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button
                    onClick={handleStart}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    {isRTL ? (
                      <>
                        <ArrowRight className="ml-2 h-4 w-4" />
                        {t("getStarted")}
                      </>
                    ) : (
                      <>
                        {t("getStarted")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <IntegrationSteps
                currentStep={currentStep}
                onNext={handleNextStep}
                onPrevious={handlePreviousStep}
                onConnectService={handleConnectService}
                tokens={tokens}
                services={services}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-slate-500">
        {t("copyright")}
      </footer>
    </div>
  );
};

export default Index;
