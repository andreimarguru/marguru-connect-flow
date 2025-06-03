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
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import PricingForm from "./PricingForm";
import ScheduleCalendar from "./ScheduleCalendar";
import PolicySetup from "./PolicySetup";
import ApiClient from "../services/ApiClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "@/store/userStore";
import AdvancedPreferencesForm from "./AdvancedPreferencesForm";
import QRCodeDisplay from "./QRCodeDisplay";

interface IntegrationStepsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onConnectService: (serviceName: string) => void;
  tokens: any[];
  services?: any[];
}

const IntegrationSteps = ({
  currentStep,
  onNext,
  onPrevious,
  onConnectService,
  tokens,
  services,
}: IntegrationStepsProps) => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const isGmailConnected = tokens?.some((token) => token.kind === "GMAIL");
  const isWhatsappConnected = tokens?.some(
    (token) => token.kind === "WHATSAPP"
  );
  const { userInfo } = useUserStore();
  const initialSchedule = userInfo?.businessInfo?.workSchedule;

  const calculateProgress = () => {
    return Math.min((currentStep / 5) * 100, 100);
    return (currentStep / 5) * 100;
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
            <CardFooter className="flex flex-col justify-between pt-2">
              {isGmailConnected && (
                <div className="flex items-center justify-center mb-2 text-green-600 font-medium">
                  <Check className="h-5 w-5 mr-2" />
                  {t("gmailConnected")}
                </div>
              )}
              <div className="flex w-full justify-between">
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
                {isGmailConnected ? (
                  <Button onClick={onNext} className="bg-indigo-600 text-white">
                    {t("next") || "Next Step"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => onConnectService("Gmail")}
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
                )}
              </div>
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
            <CardFooter className="flex flex-col justify-between pt-2">
              {isWhatsappConnected && (
                <div className="flex items-center justify-center mb-2 text-green-600 font-medium">
                  <Check className="h-5 w-5 mr-2" />
                  {t("connected")}
                </div>
              )}
              <div className="flex w-full justify-between">
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
                {isWhatsappConnected ? (
                  <Button onClick={onNext} className="bg-indigo-600 text-white">
                    {t("next") || "Next Step"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => onConnectService("WhatsApp")}
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
                )}
              </div>
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
              <PricingForm
                onSave={onNext}
                onPrevious={onPrevious}
                initialServices={services}
              />
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
              <ScheduleCalendar
                onSave={onNext}
                onPrevious={onPrevious}
                initialSchedule={initialSchedule}
              />
            </CardContent>
          </>
        );
      case 5:
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">
                {t("policyTitle")}
              </CardTitle>
              <CardDescription>{t("policyDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <PolicySetup onNext={() => onNext()} onPrevious={onPrevious} />
            </CardContent>
          </>
        );
      default:
        // This will handle step 6 (final stage)
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">{t("allSet")}</CardTitle>
              <CardDescription>{t("successMessage")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-2 text-sm text-slate-500">{t("botReady")}</p>
                <p className="text-xs text-slate-400">
                  {t("readyDescription")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button
                onClick={() => (window.location.href = "/chat")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isRTL ? (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
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

  // Hide step counter on final screen or show as completed
  const showStepCounter = () => {
    if (currentStep > 5) {
      return (
        <h2 className="text-center text-slate-600 font-medium">
          {t("complete")}
        </h2>
      );
    }
    return (
      <h2 className="text-center text-slate-600 font-medium">
        {t("step")} {currentStep} {t("of")} 5
      </h2>
    );
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        {showStepCounter()}
        <h2 className="text-center text-slate-600 font-medium">
          {t("step")} {currentStep} {t("of")} 5
        </h2>
        <Progress value={calculateProgress()} className="h-2" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>
            {currentStep > 5
              ? t("complete")
              : `${t("step")} ${currentStep} ${t("of")} 5`}
          </span>
          <span>
            {Math.round(calculateProgress())}% {t("complete")}
          </span>
          <span>
            {t("step")} {currentStep} {t("of")} 5
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
