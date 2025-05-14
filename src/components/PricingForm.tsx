
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";

interface PriceItem {
  id: string;
  serviceName: string;
  duration: string;
  price: string;
}

interface PricingFormProps {
  onSave: () => void;
}

const PricingForm = ({ onSave }: PricingFormProps) => {
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    { id: "1", serviceName: "", duration: "", price: "" },
  ]);
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);

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
    // Here you would normally save the data
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id={`price-${item.id}`}
                    value={item.price}
                    onChange={(e) =>
                      updatePriceItem(item.id, "price", e.target.value)
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

      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium text-slate-800 mb-2">{t('pricingBenefits')}</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('pricingBenefit1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('pricingBenefit2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('pricingBenefit3')}</span>
          </li>
        </ul>
      </div>

      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        {t('savePricing')}
      </Button>
    </form>
  );
};

export default PricingForm;
