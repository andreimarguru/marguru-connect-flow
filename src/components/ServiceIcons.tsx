
import { Calendar, Contact, HardDrive, MessageCircle } from "lucide-react";

const ServiceIcons = () => {
  return (
    <div className="flex justify-center gap-6 my-6">
      <div className="flex flex-col items-center gap-1">
        <div className="bg-blue-100 p-2 rounded-full">
          <HardDrive className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-xs text-slate-600">Drive</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-red-100 p-2 rounded-full">
          <Calendar className="h-6 w-6 text-red-500" />
        </div>
        <span className="text-xs text-slate-600">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-indigo-100 p-2 rounded-full">
          <Contact className="h-6 w-6 text-indigo-500" />
        </div>
        <span className="text-xs text-slate-600">Contacts</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-green-100 p-2 rounded-full">
          <MessageCircle className="h-6 w-6 text-green-600" />
        </div>
        <span className="text-xs text-slate-600">WhatsApp</span>
      </div>
    </div>
  );
};

export default ServiceIcons;
