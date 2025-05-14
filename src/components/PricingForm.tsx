
import React, { useState } from "react";
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

interface PriceItem {
  id: string;
  serviceName: string;
  duration: string;
  price: string;
}

interface PricingFormProps {
  onSave: () => void;
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

const PricingForm = ({ onSave }: PricingFormProps) => {
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    { id: "1", serviceName: "", duration: "", price: "" },
  ]);
  const [currency, setCurrency] = useState("USD");
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const { toast } = useToast();

  const getCurrencySymbol = (currencyCode: string) => {
    const found = currencies.find(c => c.code === currencyCode);
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

  const updatePriceItem = (id: string, field: keyof PriceItem, value: string) => {
    setPriceItems(
      priceItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one service has all fields filled
    const hasValidService = priceItems.some(
      item => item.serviceName.trim() !== "" && 
             item.duration.trim() !== "" && 
             item.price.trim() !== ""
    );
    
    if (!hasValidService) {
      toast({
        title: "Please add at least one service",
        description: "Fill out all the fields for at least one service",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally save the data
    onSave();
  };

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Currency selection */}
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select 
          value={currency}
          onValueChange={(value) => setCurrency(value)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(curr => (
              <SelectItem key={curr.code} value={curr.code}>
                {curr.symbol} - {curr.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {priceItems.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`service-${item.id}`}>{t('serviceName')}</Label>
                <Input
                  id={`service-${item.id}`}
                  value={item.serviceName}
                  onChange={(e) =>
                    updatePriceItem(item.id, "serviceName", e.target.value)
                  }
                  placeholder={t('serviceNamePlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`duration-${item.id}`}>{t('duration')}</Label>
                <Input
                  id={`duration-${item.id}`}
                  value={item.duration}
                  onChange={(e) =>
                    updatePriceItem(item.id, "duration", e.target.value)
                  }
                  placeholder={t('durationPlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price-${item.id}`}>{t('price')}</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 flex items-center justify-center">
                    {currencySymbol}
                  </div>
                  <Input
                    id={`price-${item.id}`}
                    value={item.price}
                    onChange={(e) =>
                      updatePriceItem(item.id, "price", e.target.value.replace(/[^0-9.]/g, ''))
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
                {t('remove')}
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
        {t('addService')}
      </Button>

      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        {t('savePricing')}
      </Button>
    </form>
  );
};

export default PricingForm;
