
import React from "react";
import { Check, Share, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "@/lib/i18n/translations";

interface QRCodeDisplayProps {
  businessName?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ businessName = "Marguru" }) => {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  
  // Generate a mock QR code pattern with a grid
  const renderMockQRCode = () => {
    return (
      <div className="w-40 h-40 bg-white p-2 mx-auto relative border-2">
        <div className="absolute top-0 left-0 w-10 h-10 border-4 border-black border-r-0 border-b-0"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-4 border-black border-l-0 border-b-0"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-4 border-black border-r-0 border-t-0"></div>
        <div className="grid grid-cols-7 grid-rows-7 w-full h-full">
          {Array(49).fill(null).map((_, i) => (
            <div
              key={i}
              className={`${Math.random() > 0.7 ? 'bg-black' : 'bg-white'} border border-gray-100`}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-1 rounded-md">
            <Scissors className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex items-center justify-center gap-2 bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 text-sm">
        <Check className="h-4 w-4" />
        <span>{t('ready')}</span>
      </div>
      
      {renderMockQRCode()}
      
      <h3 className="text-lg font-medium text-center">{businessName}</h3>
      <p className="text-sm text-slate-600 text-center max-w-xs">
        {t('bookingUrl')}
      </p>
      
      <div className="flex gap-2 mt-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => {}}>
          <Share className="h-4 w-4" />
          {t('share')}
        </Button>
        <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={() => {}}>
          <ExternalLink className="h-4 w-4" />
          {t('visit')}
        </Button>
      </div>
    </div>
  );
};

// For QR code import
const Scissors = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export default QRCodeDisplay;
