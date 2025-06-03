import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";
import { CalendarDays, Clock, Coffee } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";

const API_KEY = "Jambulat14";

interface ScheduleCalendarProps {
  onSave: () => void;
  onPrevious: () => void;
  initialSchedule?: any; // Accept initial schedule
}

const timeOptions = [
  "Off",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
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

const ScheduleCalendar = ({
  onSave,
  onPrevious,
  initialSchedule,
}: ScheduleCalendarProps) => {
  const { toast } = useToast();
  const { userInfo } = useUserStore();
  const userId = userInfo?.user?.id;
  const API_URL = userId
    ? `https://app.marguru.dev/api/onboarding/business-info/${userId}`
    : "";
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Initialize a week starting from today
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // Helper to convert API schedule to component state
  const getInitialSchedule = () => {
    if (initialSchedule) {
      // Map your API schedule to the component's WeekSchedule format
      const weekMap: { [key: string]: string } = {
        sunday: "0",
        monday: "1",
        tuesday: "2",
        wednesday: "3",
        thursday: "4",
        friday: "5",
        saturday: "6",
      };
      const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const weekDays = Array.from({ length: 7 }, (_, i) =>
        addDays(startDate, i)
      );
      const schedule: WeekSchedule = {};
      weekDays.forEach((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        // Always use English for API mapping
        const dayName = format(day, "EEEE", { locale: enUS }).toLowerCase();
        const apiDay = initialSchedule[dayName];
        if (apiDay && apiDay.open && apiDay.close) {
          schedule[dateKey] = {
            dayOff: false,
            workStart: apiDay.open,
            workEnd: apiDay.close,
            breakStart: apiDay.breaks?.[0]?.split("-")[0] || "Off",
            breakEnd: apiDay.breaks?.[0]?.split("-")[1] || "14:00",
          };
        } else {
          schedule[dateKey] = {
            dayOff: true,
            workStart: "9:00",
            workEnd: "18:00",
            breakStart: "Off",
            breakEnd: "14:00",
          };
        }
      });
      return schedule;
    }
    // Default: allow to fill
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
    const schedule: WeekSchedule = {};
    weekDays.forEach((day) => {
      const dateKey = format(day, "yyyy-MM-dd");
      schedule[dateKey] = {
        dayOff: false,
        workStart: "9:00",
        workEnd: "18:00",
        breakStart: "Off",
        breakEnd: "14:00",
      };
    });
    return schedule;
  };

  const [schedule, setSchedule] = useState<WeekSchedule>(getInitialSchedule);
  const [lastSaved, setLastSaved] = useState<WeekSchedule>(getInitialSchedule);
  const [saved, setSaved] = useState(true);

  // Track changes
  useEffect(() => {
    setSaved(JSON.stringify(schedule) === JSON.stringify(lastSaved));
  }, [schedule, lastSaved]);

  const toggleDayOff = (dateKey: string) => {
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        dayOff: !prev[dateKey].dayOff,
      },
    }));
  };

  const updateSchedule = (
    dateKey: string,
    field: keyof DaySchedule,
    value: string | boolean
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value,
      },
    }));
  };

  const handleCancel = () => {
    setSchedule(lastSaved);
    setSaved(true);
  };

  // Convert WeekSchedule to API format
  const toApiSchedule = (week: WeekSchedule) => {
    const api: any = {};
    Object.entries(week).forEach(([dateKey, day]) => {
      const dayName = format(new Date(dateKey), "EEEE", {
        locale: enUS,
      }).toLowerCase();
      if (day.dayOff) {
        api[dayName] = null;
      } else {
        api[dayName] = {
          open: day.workStart,
          close: day.workEnd,
          breaks:
            day.breakStart !== "Off"
              ? [`${day.breakStart}-${day.breakEnd}`]
              : [],
        };
      }
    });
    return api;
  };

  // PATCH save
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API_URL) {
      toast({
        title: "Error",
        description: "User ID not found. Please reload the page.",
        variant: "destructive",
      });
      return;
    }
    try {
      const apiSchedule = toApiSchedule(schedule);
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify({ work_schedule: apiSchedule }), // <-- snake_case!
      });
      if (!response.ok) throw new Error("Failed to save schedule");
      setLastSaved(schedule);
      setSaved(true);
      toast({
        title: t("scheduleUpdated"),
        description: t("scheduleUpdatedDesc"),
      });
      // Do NOT call onSave() here!
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save schedule. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {t("weeklySchedule")}
        </h3>

        <div className="space-y-6">
          {weekDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const daySchedule = schedule[dateKey];

            return (
              <div
                key={dateKey}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
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
                    {daySchedule.dayOff ? t("workDay") : t("dayOff")}
                  </Button>
                </div>

                {!daySchedule.dayOff && (
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Clock className="h-4 w-4 text-indigo-500 mr-1" />
                        {t("workingHours")}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={daySchedule.workStart}
                          onValueChange={(value) =>
                            updateSchedule(dateKey, "workStart", value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t("start")} />
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
                            <SelectValue placeholder={t("end")} />
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
                        {t("breakTime")}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={daySchedule.breakStart}
                          onValueChange={(value) => {
                            updateSchedule(dateKey, "breakStart", value);
                            // If we select "Off", we don't need to set breakEnd
                            if (value === "Off") {
                              updateSchedule(dateKey, "breakEnd", "14:00"); // Default value, won't be used
                            }
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t("start")} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time === "Off" ? t("noBreak") : time}
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
                                <SelectValue placeholder={t("end")} />
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

      {/* Cancel link above buttons if unsaved */}
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
          onClick={onPrevious}
          className="w-1/2"
        >
          {t("back")}
        </Button>
        {!saved ? (
          <Button
            type="submit"
            className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
          >
            {t("saveSchedule")}
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
      {saved && (
        <div className="text-green-600 text-center font-medium mb-2">
          {t("scheduleUpdatedDesc")}
        </div>
      )}
    </form>
  );
};

export default ScheduleCalendar;
