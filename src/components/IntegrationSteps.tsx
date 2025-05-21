import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Contact,
  HardDrive,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import PricingForm from "./PricingForm";
import ScheduleCalendar from "./ScheduleCalendar";
import ApiClient from "../services/ApiClient";
import { useAuth0 } from "@auth0/auth0-react";
interface IntegrationStepsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

const IntegrationSteps = ({
  currentStep,
  onNext,
  onPrevious,
}: IntegrationStepsProps) => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const { getAccessTokenSilently } = useAuth0();
  const apiClient = new ApiClient(
    getAccessTokenSilently,
    import.meta.env.VITE_AUTH0_AUDIENCE,
    "read:data write:data"
  );

  const handleConnectService = async (serviceName: string) => {
    // if (serviceName === "Gmail") {
    //   try {
    //     const response = await apiClient.get("/api/gmail/connect");
    //     if (response.auth_url) {
    //       window.location.href = response.auth_url;
    //     } else {
    //       console.error("No auth_url returned from the backend");
    //     }
    //   } catch (error) {
    //     console.error("Failed to connect Gmail integration:", error);
    //   }
    // } else if (serviceName === "WhatsApp") {
    //   try {
    //     const response = await apiClient.get("/api/whatsapp/connect");
    //     if (response.auth_url) {
    //       window.location.href = response.auth_url;
    //     } else {
    //       console.error("No auth_url returned from the backend");
    //     }
    //   } catch (error) {
    //     console.error("Failed to connect WhatsApp integration:", error);
    //   }
    // }
    toast({
      title: `${t("connecting")} ${serviceName}`,
      description: t("authorize"),
    });
    // Simulating connection success
    setTimeout(() => {
      toast({
        title: `${serviceName} ${t("connected")}`,
        description: t("integration"),
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
              <CardTitle className="text-xl font-bold">
                {t("googleServicesTitle")}
              </CardTitle>
              <CardDescription>{t("googleServicesDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/src/assets/icons/google-drive.png"
                      alt="Google Drive"
                      className="h-8 w-8"
                    />
                    <img
                      src="/src/assets/icons/gmail.png"
                      alt="Gmail"
                      className="h-8 w-8"
                    />
                    <img
                      src="/src/assets/icons/google-contacts.png"
                      alt="Google Contacts"
                      className="h-8 w-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">
                      {t("googleServicesBenefits")}
                    </h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-3">
                      <li className="space-y-1">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">Google Drive</span>
                        </div>
                        <ul className={`${isRTL ? "pr-6" : "pl-6"} space-y-1`}>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("driveStore")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("driveOrganize")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("driveAccess")}</span>
                          </li>
                        </ul>
                      </li>
                      <li className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <span className="font-medium">Google Calendar</span>
                        </div>
                        <ul className={`${isRTL ? "pr-6" : "pl-6"} space-y-1`}>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("calendarAuto")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("calendarRemind")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("calendarSync")}</span>
                          </li>
                        </ul>
                      </li>
                      <li className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Contact className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                          <span className="font-medium">Google Contacts</span>
                        </div>
                        <ul className={`${isRTL ? "pr-6" : "pl-6"} space-y-1`}>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("contactsSave")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("contactsGroup")}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{t("contactsTrack")}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                {isRTL ? (
                  <>
                    {t("back")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("back")}
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleConnectService("Gmail")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRTL ? (
                  <>
                    <HardDrive className="mr-2 h-4 w-4" />
                    {t("connectGoogle")}
                  </>
                ) : (
                  <>
                    {t("connectGoogle")}
                    <HardDrive className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">
                {t("whatsappTitle")}
              </CardTitle>
              <CardDescription>{t("whatsappDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                  <img
                    src="/src/assets/icons/whatsapp-business.png"
                    alt="WhatsApp Business"
                    className="h-12 w-12"
                  />
                  <div>
                    <h3 className="font-medium text-slate-800">
                      {t("whatsappBenefits")}
                    </h3>
                    <ul className="text-sm text-slate-600 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{t("whatsappAuto")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{t("whatsappPersonal")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{t("whatsappPromo")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={onPrevious}>
                {isRTL ? (
                  <>
                    {t("back")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("back")}
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleConnectService("WhatsApp")}
                className="bg-green-600 hover:bg-green-700"
              >
                {isRTL ? (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("connectWhatsApp")}
                  </>
                ) : (
                  <>
                    {t("connectWhatsApp")}
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">
                {t("pricingTitle")}
              </CardTitle>
              <CardDescription>{t("pricingDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <PricingForm onSave={onNext} />
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">
                {t("scheduleTitle")}
              </CardTitle>
              <CardDescription>{t("scheduleDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ScheduleCalendar onSave={onNext} />
            </CardContent>
          </>
        );
      default:
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-green-600">
                {t("allSet")}
              </CardTitle>
              <CardDescription className="text-base">
                {t("successMessage")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-center">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 text-lg">
                    {t("botReady")}
                  </h3>
                  <p className="text-slate-600">{t("readyDescription")}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button
                onClick={() => (window.location.href = "/chat")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isRTL ? (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("goToChat")}
                  </>
                ) : (
                  <>
                    {t("goToChat")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
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
          {t("step")} {currentStep} {t("of")} 4
        </h2>
        <Progress value={calculateProgress()} className="h-2" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>
            {t("step")} {currentStep} {t("of")} 4
          </span>
          <span>
            {Math.round(calculateProgress())}% {t("complete")}
          </span>
        </div>
      </div>

      <Card className="w-full overflow-hidden shadow-lg border-0">
        {stepContent()}
      </Card>
    </div>
  );
};

export default IntegrationSteps;
