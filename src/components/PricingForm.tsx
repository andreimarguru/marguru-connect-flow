import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";

const API_KEY = "Jambulat14";

interface PriceItem {
  id: string;
  serviceName: string;
  duration: string;
  price: string;
}

interface PricingFormProps {
  onSave: () => void;
  onPrevious: () => void; // Add this
  initialServices?: any[];
}

// Currency data with symbols
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const PricingForm = ({
  onSave,
  onPrevious,
  initialServices,
}: PricingFormProps) => {
  const { userInfo } = useUserStore();
  const userId = userInfo?.user?.id;

  // Build the API URL dynamically using the user ID
  const API_URL = userId
    ? `https://app.marguru.dev/api/onboarding/business-info/${userId}`
    : "";

  const initialCurrency =
    (initialServices && initialServices[0]?.currency) || "USD";
  const [currency, setCurrency] = useState(initialCurrency);

  // Store the last saved state for cancel
  const [lastSaved, setLastSaved] = useState<PriceItem[]>(() => {
    if (initialServices && initialServices.length > 0) {
      return initialServices.map((s, idx) => ({
        id: (idx + 1).toString(),
        serviceName: s.name || "",
        duration: s.duration || "",
        price: s.price ? String(s.price) : "",
      }));
    }
    return [{ id: "1", serviceName: "", duration: "", price: "" }];
  });

  const [priceItems, setPriceItems] = useState<PriceItem[]>(lastSaved);
  const [saved, setSaved] = useState(true); // true if no unsaved changes

  // Detect if form is dirty
  useEffect(() => {
    const isDirty = JSON.stringify(priceItems) !== JSON.stringify(lastSaved);
    setSaved(!isDirty);
  }, [priceItems, lastSaved]);

  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const { toast } = useToast();

  const getCurrencySymbol = (currencyCode: string) => {
    const found = currencies.find((c) => c.code === currencyCode);
    return found ? found.symbol : "$";
  };

  const addPriceItem = () => {
    const newItem = {
      id: Date.now().toString(),
      serviceName: "",
      duration: "",
      price: "",
    };
    setPriceItems([...priceItems, newItem]);
  };

  const removePriceItem = (id: string) => {
    if (priceItems.length <= 1) return;
    setPriceItems(priceItems.filter((item) => item.id !== id));
  };

  const updatePriceItem = (
    id: string,
    field: keyof PriceItem,
    value: string
  ) => {
    setPriceItems(
      priceItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one service has all fields filled
    const validServices = priceItems.filter(
      (item) =>
        item.serviceName.trim() !== "" &&
        item.duration.trim() !== "" &&
        item.price.trim() !== ""
    );

    if (validServices.length === 0) {
      toast({
        title: "Please add at least one service",
        description: "Fill out all the fields for at least one service",
        variant: "destructive",
      });
      return;
    }

    // Prepare services array for API
    const services = validServices.map((item) => ({
      name: item.serviceName,
      duration: item.duration,
      price: Number(item.price),
      currency,
    }));

    if (!API_URL) {
      toast({
        title: "Error",
        description: "User ID not found. Please reload the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify({ services }),
      });

      if (!response.ok) {
        throw new Error("Failed to save services");
      }

      // On successful save:
      setLastSaved(priceItems);
      setSaved(true);
      toast({
        title: t("savePricing"),
        description: t("scheduleUpdatedDesc"),
        variant: "default",
      });

      // Do NOT call onSave() here!
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save services. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setPriceItems(lastSaved);
    setSaved(true);
  };

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Currency selection */}
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={(value) => setCurrency(value)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((curr) => (
              <SelectItem key={curr.code} value={curr.code}>
                {curr.symbol} - {curr.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {priceItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`service-${item.id}`}>{t("serviceName")}</Label>
                <Input
                  id={`service-${item.id}`}
                  value={item.serviceName}
                  onChange={(e) =>
                    updatePriceItem(item.id, "serviceName", e.target.value)
                  }
                  placeholder={t("serviceNamePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`duration-${item.id}`}>{t("duration")}</Label>
                <Input
                  id={`duration-${item.id}`}
                  value={item.duration}
                  onChange={(e) =>
                    updatePriceItem(item.id, "duration", e.target.value)
                  }
                  placeholder={t("durationPlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price-${item.id}`}>{t("price")}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 flex items-center justify-center">
                    {currencySymbol}
                  </div>
                  <Input
                    id={`price-${item.id}`}
                    value={item.price}
                    onChange={(e) =>
                      updatePriceItem(
                        item.id,
                        "price",
                        e.target.value.replace(/[^0-9.]/g, "")
                      )
                    }
                    className="pl-10"
                    placeholder="0.00"
                    type="text"
                    inputMode="decimal"
                  />
                </div>
              </div>
            </div>
            {priceItems.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                onClick={() => removePriceItem(item.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {t("remove")}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={addPriceItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        {t("addService")}
      </Button>

      {/* Show Cancel as a link-like <p> above the action buttons if there are unsaved changes */}
      {!saved && (
        <p
          className="text-sm text-blue-600 underline cursor-pointer text-center mb-2"
          onClick={handleCancel}
          tabIndex={0}
          role="button"
        >
          {t("cancel") || "Cancel"}
        </p>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-1/2"
          onClick={onPrevious}
        >
          {t("back")}
        </Button>

        {!saved ? (
          <Button
            type="submit"
            className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
          >
            {t("savePricing")}
          </Button>
        ) : (
          <Button
            type="button"
            className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
            onClick={onSave}
          >
            {t("next")}
          </Button>
        )}
      </div>

      {/* Optional inline message after saving */}
      {saved && (
        <div className="text-green-600 text-center font-medium mb-2">
          {t("scheduleUpdatedDesc")}
        </div>
      )}
    </form>
  );
};

export default PricingForm;
