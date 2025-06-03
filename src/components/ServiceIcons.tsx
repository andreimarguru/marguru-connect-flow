const ServiceIcons = () => {
  return (
    <div className="flex justify-center gap-6 my-6">
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-full">
          <img
            src="/src/assets/icons/google-drive.png"
            alt="Google Drive"
            className="h-8 w-8"
          />
        </div>
        <span className="text-xs text-slate-600">Drive</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-full">
          <img
            src="/src/assets/icons/gmail.png"
            alt="Gmail"
            className="h-8 w-8"
          />
        </div>
        <span className="text-xs text-slate-600">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-full">
          <img
            src="/src/assets/icons/google-contacts.png"
            alt="Google Contacts"
            className="h-8 w-8"
          />
        </div>
        <span className="text-xs text-slate-600">Contacts</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-full">
          <img
            src="/src/assets/icons/whatsapp-business.png"
            alt="WhatsApp"
            className="h-8 w-8"
          />
        </div>
        <span className="text-xs text-slate-600">WhatsApp</span>
      </div>
    </div>
  );
};

export default ServiceIcons;
