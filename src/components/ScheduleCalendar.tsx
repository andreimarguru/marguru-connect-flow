
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import { CalendarDays, Clock, Coffee } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ScheduleCalendarProps {
  onSave: () => void;
}

const timeOptions = [
  "Off", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

interface DaySchedule {
  dayOff: boolean;
  workStart: string;
  workEnd: string;
  breakStart: string;
  breakEnd: string;
}

interface WeekSchedule {
  [key: string]: DaySchedule;
}

const ScheduleCalendar = ({ onSave }: ScheduleCalendarProps) => {
  const { toast } = useToast();
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Initialize a week starting from today
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  const [schedule, setSchedule] = useState<WeekSchedule>(() => {
    // Initialize with default schedule for a week
    const initialSchedule: WeekSchedule = {};
    weekDays.forEach((day) => {
      const dateKey = format(day, "yyyy-MM-dd");
      initialSchedule[dateKey] = {
        dayOff: false,
        workStart: "9:00",
        workEnd: "18:00",
        breakStart: "13:00",
        breakEnd: "14:00",
      };
    });
    return initialSchedule;
  });

  const toggleDayOff = (dateKey: string) => {
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        dayOff: !prev[dateKey].dayOff,
      },
    }));
  };

  const updateSchedule = (dateKey: string, field: keyof DaySchedule, value: string | boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('scheduleUpdated'),
      description: t('scheduleUpdatedDesc'),
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">{t('weeklySchedule')}</h3>
        
        <div className="space-y-6">
          {weekDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const daySchedule = schedule[dateKey];
            
            return (
              <div key={dateKey} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="font-medium">
                      {format(day, "EEEE")}, {format(day, "MMMM d")}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant={daySchedule.dayOff ? "default" : "outline"}
                    size="sm"
                    className={
                      daySchedule.dayOff 
                        ? "bg-red-500 hover:bg-red-600 text-white" 
                        : "text-red-500 hover:bg-red-50"
                    }
                    onClick={() => toggleDayOff(dateKey)}
                  >
                    {daySchedule.dayOff ? t('workDay') : t('dayOff')}
                  </Button>
                </div>
                
                {!daySchedule.dayOff && (
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Clock className="h-4 w-4 text-indigo-500 mr-1" />
                        {t('workingHours')}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={daySchedule.workStart}
                          onValueChange={(value) => 
                            updateSchedule(dateKey, "workStart", value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t('start')} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.slice(1).map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>-</span>
                        <Select
                          value={daySchedule.workEnd}
                          onValueChange={(value) => 
                            updateSchedule(dateKey, "workEnd", value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t('end')} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.slice(1).map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Coffee className="h-4 w-4 text-indigo-500 mr-1" />
                        {t('breakTime')}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={daySchedule.breakStart}
                          onValueChange={(value) => 
                            updateSchedule(dateKey, "breakStart", value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t('start')} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time === "Off" ? t('noBreak') : time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {daySchedule.breakStart !== "Off" && (
                          <>
                            <span>-</span>
                            <Select
                              value={daySchedule.breakEnd}
                              onValueChange={(value) => 
                                updateSchedule(dateKey, "breakEnd", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder={t('end')} />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.slice(1).map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium text-slate-800 mb-2">{t('scheduleBenefits')}</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('scheduleBenefit1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('scheduleBenefit2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>{t('scheduleBenefit3')}</span>
          </li>
        </ul>
      </div>

      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        {t('saveSchedule')}
      </Button>
    </form>
  );
};

export default ScheduleCalendar;
