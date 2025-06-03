import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";

interface PolicySetupProps {
  onNext: () => void;
  onPrevious: () => void;
}

const PolicySetup = ({ onNext, onPrevious }: PolicySetupProps) => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);

  const [cancellationPolicy, setCancellationPolicy] = useState<string>("");
  const [appointmentGap, setAppointmentGap] = useState<string>("");
  const [customGap, setCustomGap] = useState<string>("");

  const handleNext = () => {
    if (!cancellationPolicy || !appointmentGap) {
      toast({
        title: t("requiredFields"),
        description: t("requiredFieldsDesc"),
        variant: "destructive",
      });
      return;
    }

    if (appointmentGap === "custom" && !customGap) {
      toast({
        title: t("customGapRequired"),
        description: t("customGapDesc"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("preferencesSaved"),
      description: t("preferencesSavedDesc"),
      variant: "default",
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Cancellation Policy */}
      <div className="space-y-2">
        <Label>{t("cancellationPolicy")}</Label>
        <Select
          value={cancellationPolicy}
          onValueChange={setCancellationPolicy}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("cancellationPolicyPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t("noPolicy")}</SelectItem>
            <SelectItem value="12h">{t("hours12")}</SelectItem>
            <SelectItem value="24h">{t("hours24")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointment Gap */}
      <div className="space-y-2">
        <Label>{t("appointmentGap")}</Label>
        <Select value={appointmentGap} onValueChange={setAppointmentGap}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("appointmentGapPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{t("noGap")}</SelectItem>
            <SelectItem value="5">{t("minutes5")}</SelectItem>
            <SelectItem value="10">{t("minutes10")}</SelectItem>
            <SelectItem value="15">{t("minutes15")}</SelectItem>
            <SelectItem value="custom">{t("custom")}</SelectItem>
          </SelectContent>
        </Select>

        {appointmentGap === "custom" && (
          <div className="mt-2">
            <Input
              type="number"
              value={customGap}
              onChange={(e) => setCustomGap(e.target.value)}
              placeholder={t("enterMinutes")}
              className="w-32"
              min="1"
              max="60"
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-1/2"
          onClick={onPrevious}
        >
          {t("back")}
        </Button>
        <Button
          type="button"
          className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
          onClick={handleNext}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default PolicySetup;
