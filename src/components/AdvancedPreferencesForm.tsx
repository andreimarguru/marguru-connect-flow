
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";

interface AdvancedPreferencesFormProps {
  onSave: () => void;
}

interface FormValues {
  serviceBundles: "yes" | "no";
  bundleName: string;
  bundleSessions: string;
  bundleDiscount: string;
  cancellationPolicy: string;
  cancellationHours: string;
  cancellationFee: string;
  appointmentGap: string;
  customGap: string;
  followUp: string;
  taxOrFee: "yes" | "no";
  feeType: string;
  feeValue: string;
  invoicing: string;
}

const AdvancedPreferencesForm = ({ onSave }: AdvancedPreferencesFormProps) => {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      serviceBundles: "no",
      bundleName: "",
      bundleSessions: "3",
      bundleDiscount: "10",
      cancellationPolicy: "no",
      cancellationHours: "24",
      cancellationFee: "",
      appointmentGap: "no",
      customGap: "5",
      followUp: "no",
      taxOrFee: "no",
      feeType: "percentage",
      feeValue: "10",
      invoicing: "no",
    }
  });

  const watchBundles = form.watch("serviceBundles");
  const watchCancellation = form.watch("cancellationPolicy");
  const watchGap = form.watch("appointmentGap");
  const watchTax = form.watch("taxOrFee");
  
  const handleSubmit = (data: FormValues) => {
    // In a real app we'd save this data to the backend
    console.log("Advanced preferences saved:", data);
    toast({
      title: t('preferencesSaved'),
      description: t('preferencesUpdated'),
    });
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Q1. Service Bundles */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <FormField
              control={form.control}
              name="serviceBundles"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium">{t('serviceBundlesLabel')}</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('yes')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('no')}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {watchBundles === "yes" && (
              <div className="mt-4 pl-6 border-l-2 border-indigo-100 space-y-3">
                <FormField
                  control={form.control}
                  name="bundleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('packageName')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('packageNamePlaceholder')} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="bundleSessions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('sessions')}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectSessions')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bundleDiscount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('discount')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} type="number" min="0" max="100" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500">%</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Q2. Cancellation Policy */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <FormField
            control={form.control}
            name="cancellationPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">{t('cancellationPolicyLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectPolicy')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no">{t('noPolicy')}</SelectItem>
                    <SelectItem value="12">{t('hours12')}</SelectItem>
                    <SelectItem value="24">{t('hours24')}</SelectItem>
                    <SelectItem value="custom">{t('customPolicy')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {watchCancellation === "custom" && (
            <div className="mt-4 pl-6 border-l-2 border-indigo-100 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="cancellationHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('hoursNotice')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cancellationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fee')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('feePlaceholder')} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Q3. Appointment Gap */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <FormField
            control={form.control}
            name="appointmentGap"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">{t('appointmentGapLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectGap')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no">{t('noGap')}</SelectItem>
                    <SelectItem value="5">5 {t('min')}</SelectItem>
                    <SelectItem value="10">10 {t('min')}</SelectItem>
                    <SelectItem value="15">15 {t('min')}</SelectItem>
                    <SelectItem value="custom">{t('customGap')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {watchGap === "custom" && (
            <div className="mt-4 pl-6 border-l-2 border-indigo-100">
              <FormField
                control={form.control}
                name="customGap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('customGapValue')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" min="1" max="60" />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">{t('min')}</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        
        {/* Q4. Follow-Up Messages */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <FormField
            control={form.control}
            name="followUp"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">{t('followUpLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="same-day" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('sameDay')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="next-day" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('nextDay')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="three-days" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('threeDays')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('no')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Q5. Tax or Service Fees */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <FormField
            control={form.control}
            name="taxOrFee"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">{t('taxFeeLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('allInclusive')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('yes')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {watchTax === "yes" && (
            <div className="mt-4 pl-6 border-l-2 border-indigo-100 space-y-3">
              <FormField
                control={form.control}
                name="feeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('feeType')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectFeeType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">{t('percentage')}</SelectItem>
                        <SelectItem value="fixed">{t('fixedAmount')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="feeValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('value')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" min="0" />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">
                            {form.watch("feeType") === "percentage" ? "%" : "$"}
                          </span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        
        {/* Q6. Invoicing */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <FormField
            control={form.control}
            name="invoicing"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">{t('invoicingLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('allClients')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="returning" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('returningClients')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('no')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
          {t('savePreferences')}
        </Button>
      </form>
    </Form>
  );
};

export default AdvancedPreferencesForm;
