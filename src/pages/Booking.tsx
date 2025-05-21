
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";

// Mock data that would be fetched from the previous steps
const mockServices = [
  { id: "1", name: "Haircut", duration: "30 min", price: "50" },
  { id: "2", name: "Hair Color", duration: "90 min", price: "120" },
  { id: "3", name: "Styling", duration: "45 min", price: "65" }
];

const mockSchedule = {
  monday: { isWorkDay: true, hours: "10:00-19:00", breakTime: "13:00-14:00" },
  tuesday: { isWorkDay: true, hours: "10:00-19:00", breakTime: "13:00-14:00" },
  wednesday: { isWorkDay: true, hours: "10:00-19:00", breakTime: "13:00-14:00" },
  thursday: { isWorkDay: true, hours: "10:00-19:00", breakTime: "13:00-14:00" },
  friday: { isWorkDay: true, hours: "10:00-19:00", breakTime: "13:00-14:00" },
  saturday: { isWorkDay: true, hours: "11:00-16:00", breakTime: "" },
  sunday: { isWorkDay: false, hours: "", breakTime: "" }
};

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00", "18:30"
];

const Booking = () => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const [formStep, setFormStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleNextStep = () => {
    if (formStep === 1 && !selectedService) {
      toast({
        title: t('selectServiceFirst'),
        description: t('pleaseSelectService'),
        variant: "destructive"
      });
      return;
    }

    if (formStep === 2 && !selectedTimeSlot) {
      toast({
        title: t('selectTimeFirst'),
        description: t('pleaseSelectTime'),
        variant: "destructive"
      });
      return;
    }

    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      // Submit booking
      if (!contactInfo.name || !contactInfo.phone) {
        toast({
          title: t('missingInfo'),
          description: t('pleaseProvideInfo'),
          variant: "destructive"
        });
        return;
      }

      toast({
        title: t('bookingConfirmed'),
        description: t('bookingDetails', { 
          date: selectedDate?.toLocaleDateString(),
          time: selectedTimeSlot
        }),
      });

      // In a real app, would redirect to confirmation page
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  const handleBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  // Get the day of week from selected date
  const getDayOfWeek = () => {
    if (!selectedDate) return "monday";
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[selectedDate.getDay()];
  };

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const dayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][day];
    
    // Check if this is a day off or in the past
    const isInPast = date < new Date(new Date().setHours(0,0,0,0));
    const isDayOff = !mockSchedule[dayName as keyof typeof mockSchedule]?.isWorkDay;
    
    return isInPast || isDayOff;
  };

  const selectedDaySchedule = mockSchedule[getDayOfWeek() as keyof typeof mockSchedule];
  const selectedServiceDetails = mockServices.find(s => s.id === selectedService);

  const renderStepContent = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">{t('selectService')}</h2>
            <div className="grid gap-3">
              {mockServices.map(service => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${service.price}</div>
                      {selectedService === service.id && (
                        <div className="text-indigo-600 flex items-center gap-1 mt-1">
                          <Check className="h-4 w-4" />
                          <span className="text-xs">{t('selected')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">{t('selectDateTime')}</h2>
            <Tabs defaultValue="calendar">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="calendar">{t('selectDate')}</TabsTrigger>
                <TabsTrigger value="time">{t('selectTime')}</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar">
                <div className="border rounded-lg p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    className="rounded-md"
                  />
                </div>
                {selectedDate && selectedDaySchedule?.isWorkDay && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>
                      <span className="font-medium">{t('workingHours')}:</span> {selectedDaySchedule.hours}
                    </p>
                    {selectedDaySchedule.breakTime && (
                      <p>
                        <span className="font-medium">{t('breakTime')}:</span> {selectedDaySchedule.breakTime}
                      </p>
                    )}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="time">
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <div
                        key={time}
                        className={`text-center p-2 border rounded-md cursor-pointer ${
                          selectedTimeSlot === time
                            ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                            : "hover:border-indigo-300"
                        }`}
                        onClick={() => handleTimeSlotSelect(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">{t('enterDetails')}</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')}*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phone')}*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium">{t('bookingSummary')}</h3>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('service')}:</span>
                  <span className="font-medium">{selectedServiceDetails?.name}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>{t('date')}:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>{t('time')}:</span>
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>{t('duration')}:</span>
                  <span className="font-medium">{selectedServiceDetails?.duration}</span>
                </div>
                <div className="flex justify-between mt-1 pt-2 border-t">
                  <span>{t('totalPrice')}:</span>
                  <span className="font-medium">${selectedServiceDetails?.price}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 ${isRTL ? 'rtl' : ''}`}>
      {/* Header */}
      <header className="w-full p-4 shadow-sm bg-white">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-semibold">
              {t('bookAppointment')}
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`flex-1 px-2 ${step < formStep ? "text-indigo-600" : step === formStep ? "text-indigo-800" : "text-gray-400"}`}
              >
                <div className="relative">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                    step < formStep ? "bg-indigo-600 border-indigo-600" : 
                    step === formStep ? "border-indigo-600 text-indigo-600" : 
                    "border-gray-300"
                  }`}>
                    {step < formStep ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className={step === formStep ? "text-indigo-600" : "text-gray-500"}>
                        {step}
                      </span>
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`hidden sm:block absolute top-4 w-full left-0 -ml-2 ${
                      step < formStep ? "border-t-2 border-indigo-600" : "border-t-2 border-gray-300"
                    }`} />
                  )}
                </div>
                <div className="text-center mt-2 text-sm font-medium">
                  {step === 1 ? t('service') : step === 2 ? t('datetime') : t('details')}
                </div>
              </div>
            ))}
          </div>
          
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>
                {formStep === 1 
                  ? t('chooseService') 
                  : formStep === 2 
                    ? t('chooseDateTime')
                    : t('provideDetails')
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
              
              <div className="mt-8 flex justify-between">
                {formStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                  >
                    {t('back')}
                  </Button>
                )}
                <Button
                  className={`${formStep > 1 ? "ml-auto" : "w-full"} bg-indigo-600 hover:bg-indigo-700`}
                  onClick={handleNextStep}
                >
                  {formStep < 3 ? t('continue') : t('confirmBooking')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-slate-500">
        {t('copyright')}
      </footer>
    </div>
  );
};

export default Booking;
