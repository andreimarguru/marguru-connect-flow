type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    next: "Next",
    gmailConnected: "Google Services Connected",
    welcome: "Welcome to Marguru",
    description: "The CRM WhatsApp bot for service professionals",
    getStarted: "Get Started",
    hairdressers: "Hairdressers",
    serviceProfs: "Service professionals",
    connectServices:
      "Connect your essential services to unlock the full potential of Marguru.",
    step: "Step",
    of: "of",
    complete: "Complete",
    googleServicesTitle: "Step 1: Google Services",
    googleServicesDesc:
      "Connect Google services to manage your business efficiently.",
    googleServicesBenefits: "Google Services Benefits",
    whatsappTitle: "Step 2: WhatsApp Business",
    whatsappDesc:
      "Connect WhatsApp Business API to enable automated client communications.",
    whatsappBenefits: "WhatsApp Business Benefits",
    back: "Back",
    connectGoogle: "Connect Google",
    connectWhatsApp: "Connect WhatsApp",
    connecting: "Connecting to",
    authorize: "Please authorize access in the new window.",
    connected: "Connected!",
    integration: "Integration successful.",
    successMessage: "You've successfully connected all services to Marguru.",
    botReady: "Your Marguru bot is ready!",
    readyDescription:
      "You can now use the full power of Marguru to manage your clients, appointments, and documents.",
    goDashboard: "Go to Dashboard",
    copyright: "© 2025 Marguru. All rights reserved.",
    driveStore: "Automatically store before/after client photos",
    driveOrganize: "Organize client documents and service records",
    driveAccess: "Access client history from anywhere",
    calendarAuto: "Automatic appointment scheduling via WhatsApp",
    calendarRemind: "Send appointment reminders to clients",
    calendarSync: "Sync with your existing calendar",
    contactsSave: "Automatically save new clients",
    contactsGroup: "Create client groups for targeted promotions",
    contactsTrack: "Track client preferences and history",
    whatsappAuto: "Automated appointment confirmations",
    whatsappPersonal: "Personalized client communications",
    whatsappPromo: "Send promotional messages to regular clients",
    cancel: "Cancel Changes",

    // Pricing translations
    pricingTitle: "Step 3: Service Pricing",
    pricingDesc: "Set up your service prices that will be visible to clients.",
    serviceName: "Service Name",
    serviceNamePlaceholder: "e.g. Haircut",
    duration: "Duration",
    durationPlaceholder: "e.g. 30 min",
    price: "Price",
    currency: "Currency",
    currencyUSD: "USD ($)",
    currencyEUR: "EUR (€)",
    currencyRUB: "RUB (₽)",
    currencyILS: "ILS (₪)",
    currencyGBP: "GBP (£)",
    currencyJPY: "JPY (¥)",
    addService: "Add Service",
    remove: "Remove",
    savePricing: "Save Pricing",
    atLeastOneService: "Please add at least one service before continuing",

    // Schedule translations
    scheduleTitle: "Step 4: Work Schedule",
    scheduleDesc: "Set your working hours and breaks for the week.",
    weeklySchedule: "Weekly Schedule",
    workingHours: "Working Hours",
    breakTime: "Break Time",
    start: "Start",
    end: "End",
    dayOff: "Day Off",
    workDay: "Work Day",
    noBreak: "No Break",
    saveSchedule: "Save Schedule",
    scheduleUpdated: "Schedule Updated",
    scheduleUpdatedDesc: "Your work schedule has been successfully updated.",

    // Policy Setup translations
    policyTitle: "Step 5: Booking Preferences",
    policyDesc: "Set your booking preferences for appointments",
    cancellationPolicy: "Cancellation Policy",
    cancellationPolicyPlaceholder: "Set a cancellation policy for your clients",
    noPolicy: "No policy",
    hoursBeforeLabel: "hours before",
    hours12: "12 hours before",
    hours24: "24 hours before",
    appointmentGap: "Time between appointments",
    appointmentGapPlaceholder: "Select gap between appointments",
    noGap: "No gap",
    minutes5: "5 min",
    minutes10: "10 min",
    minutes15: "15 min",
    custom: "Custom",
    enterMinutes: "Enter minutes",
    requiredFields: "Required Fields",
    requiredFieldsDesc: "Please select both policy options before continuing.",
    customGapRequired: "Custom Gap Required",
    customGapDesc: "Please specify the custom gap duration.",
    preferencesSaved: "Preferences Saved",
    preferencesSavedDesc:
      "Your booking preferences have been saved successfully.",

    // Final step
    goToChat: "Go to Chat",
  },
  es: {
    next: "Siguiente",
    gmailConnected: "Servicios de Google conectados",
    welcome: "Bienvenido a Marguru",
    description: "El bot de WhatsApp CRM para profesionales de servicios",
    getStarted: "Comenzar",
    hairdressers: "Peluqueros",
    serviceProfs: "Profesionales de servicios",
    connectServices:
      "Conecta tus servicios esenciales para desbloquear todo el potencial de Marguru.",
    step: "Paso",
    of: "de",
    complete: "Completo",
    googleServicesTitle: "Paso 1: Servicios de Google",
    googleServicesDesc:
      "Conecta los servicios de Google para gestionar tu negocio eficientemente.",
    googleServicesBenefits: "Beneficios de los Servicios de Google",
    whatsappTitle: "Paso 2: WhatsApp Business",
    whatsappDesc:
      "Conecta la API de WhatsApp Business para habilitar comunicaciones automatizadas con clientes.",
    whatsappBenefits: "Beneficios de WhatsApp Business",
    back: "Atrás",
    connectGoogle: "Conectar Google",
    connectWhatsApp: "Conectar WhatsApp",
    connecting: "Conectando a",
    authorize: "Por favor autoriza el acceso en la nueva ventana.",
    connected: "¡Conectado!",
    integration: "Integración exitosa.",
    successMessage: "Has conectado con éxito todos los servicios a Marguru.",
    botReady: "¡Tu bot Marguru está listo!",
    readyDescription:
      "Ahora puedes utilizar todo el poder de Marguru para gestionar tus clientes, citas y documentos.",
    goDashboard: "Ir al Panel",
    copyright: "© 2025 Marguru. Todos los derechos reservados.",
    driveStore:
      "Almacena automáticamente fotos de antes/después de los clientes",
    driveOrganize: "Organiza documentos de clientes y registros de servicios",
    driveAccess: "Accede al historial de clientes desde cualquier lugar",
    calendarAuto: "Programación automática de citas a través de WhatsApp",
    calendarRemind: "Envía recordatorios de citas a los clientes",
    calendarSync: "Sincroniza con tu calendario existente",
    contactsSave: "Guarda automáticamente nuevos clientes",
    contactsGroup: "Crea grupos de clientes para promociones dirigidas",
    contactsTrack:
      "Realiza seguimiento de preferencias e historial de clientes",
    whatsappAuto: "Confirmaciones de citas automatizadas",
    whatsappPersonal: "Comunicaciones personalizadas con clientes",
    whatsappPromo: "Envía mensajes promocionales a clientes habituales",
    cancel: "Cancelar cambios",

    // Pricing translations
    pricingTitle: "Paso 3: Precios de Servicios",
    pricingDesc:
      "Configura los precios de tus servicios que serán visibles para los clientes.",
    serviceName: "Nombre del Servicio",
    serviceNamePlaceholder: "ej. Corte de pelo",
    duration: "Duración",
    durationPlaceholder: "ej. 30 min",
    price: "Precio",
    currency: "Moneda",
    currencyUSD: "USD ($)",
    currencyEUR: "EUR (€)",
    currencyRUB: "RUB (₽)",
    currencyILS: "ILS (₪)",
    currencyGBP: "GBP (£)",
    currencyJPY: "JPY (¥)",
    addService: "Añadir Servicio",
    remove: "Eliminar",
    savePricing: "Guardar Precios",

    // Schedule translations
    scheduleTitle: "Paso 4: Horario de Trabajo",
    scheduleDesc:
      "Establece tus horarios de trabajo y descansos para la semana.",
    weeklySchedule: "Horario Semanal",
    workingHours: "Horas de Trabajo",
    breakTime: "Tiempo de Descanso",
    start: "Inicio",
    end: "Fin",
    dayOff: "Día Libre",
    workDay: "Día Laboral",
    noBreak: "Sin Descanso",
    saveSchedule: "Guardar Horario",
    scheduleUpdated: "Horario Actualizado",
    scheduleUpdatedDesc: "Tu horario de trabajo ha sido actualizado con éxito.",

    // Policy Setup translations
    policyTitle: "Paso 5: Preferencias de reserva",
    policyDesc: "Configure sus preferencias de reserva para las citas",
    cancellationPolicy: "Política de cancelación",
    cancellationPolicyPlaceholder:
      "Establezca una política de cancelación para sus clientes",
    noPolicy: "Sin política",
    hoursBeforeLabel: "horas antes",
    hours12: "12 horas antes",
    hours24: "24 horas antes",
    appointmentGap: "Tiempo entre citas",
    appointmentGapPlaceholder: "Seleccione el intervalo entre citas",
    noGap: "Sin intervalo",
    minutes5: "5 min",
    minutes10: "10 min",
    minutes15: "15 min",
    custom: "Personalizado",
    enterMinutes: "Ingrese minutos",
    requiredFields: "Campos requeridos",
    requiredFieldsDesc:
      "Por favor, seleccione ambas opciones antes de continuar.",
    customGapRequired: "Intervalo personalizado requerido",
    customGapDesc: "Por favor, especifique la duración del intervalo.",
    preferencesSaved: "Preferencias guardadas",
    preferencesSavedDesc:
      "Sus preferencias de reserva se han guardado con éxito.",

    // Final step
    goToChat: "Ir al Chat",
  },
  ru: {
    next: "Далее",
    gmailConnected: "Сервисы Google подключены",
    welcome: "Добро пожаловать в Marguru",
    description: "CRM WhatsApp бот для профессионалов сферы услуг",
    getStarted: "Начать",
    hairdressers: "Парикмахеры",
    serviceProfs: "Сервисные специалисты",
    connectServices:
      "Подключите необходимые сервисы, чтобы раскрыть весь потенциал Marguru.",
    step: "Шаг",
    of: "из",
    complete: "Завершено",
    googleServicesTitle: "Шаг 1: Сервисы Google",
    googleServicesDesc:
      "Подключите сервисы Google для эффективного управления бизнесом.",
    googleServicesBenefits: "Преимущества сервисов Google",
    whatsappTitle: "Шаг 2: WhatsApp Business",
    whatsappDesc:
      "Подключите API WhatsApp Business для автоматизированного общения с клиентами.",
    whatsappBenefits: "Преимущества WhatsApp Business",
    back: "Назад",
    connectGoogle: "Подключить Google",
    connectWhatsApp: "Подключить WhatsApp",
    connecting: "Подключение к",
    authorize: "Пожалуйста, авторизуйте доступ в новом окне.",
    connected: "Подключено!",
    integration: "Интеграция успешна.",
    successMessage: "Вы успешно подключили все сервисы к Marguru.",
    botReady: "Ваш бот Marguru готов!",
    readyDescription:
      "Теперь вы можете использовать всю мощь Marguru для управления клиентами, встречами и документами.",
    goDashboard: "Перейти в Панель",
    copyright: "© 2025 Marguru. Все права защищены.",
    driveStore: "Автоматически сохраняйте фото клиентов до/после",
    driveOrganize: "Организуйте документы клиентов и записи о услугах",
    driveAccess: "Получайте доступ к истории клиентов откуда угодно",
    calendarAuto: "Автоматическое планирование встреч через WhatsApp",
    calendarRemind: "Отправляйте напоминания о встречах клиентам",
    calendarSync: "Синхронизируйте с вашим текущим календарем",
    contactsSave: "Автоматически сохраняйте новых клиентов",
    contactsGroup: "Создавайте группы клиентов для целевых акций",
    contactsTrack: "Отслеживайте предпочтения и историю клиентов",
    whatsappAuto: "Автоматические подтверждения встреч",
    whatsappPersonal: "Персонализированное общение с клиентами",
    whatsappPromo: "Отправляйте рекламные сообщения постоянным клиентам",
    cancel: "Отменить изменения",

    // Pricing translations
    pricingTitle: "Шаг 3: Цены на услуги",
    pricingDesc: "Настройте цены на ваши услуги, которые будут видны клиентам.",
    serviceName: "Услуга",
    serviceNamePlaceholder: "напр. Стрижка",
    duration: "Длительность",
    durationPlaceholder: "напр. 30 мин",
    price: "Цена",
    currency: "Валюта",
    currencyUSD: "USD ($)",
    currencyEUR: "EUR (€)",
    currencyRUB: "RUB (₽)",
    currencyILS: "ILS (₪)",
    currencyGBP: "GBP (£)",
    currencyJPY: "JPY (¥)",
    addService: "Добавить услугу",
    remove: "Удалить",
    savePricing: "Сохранить цены",

    // Schedule translations
    scheduleTitle: "Шаг 4: График работы",
    scheduleDesc: "Установите часы работы и перерывы на неделю.",
    weeklySchedule: "Недельный график",
    workingHours: "Рабочие часы",
    breakTime: "Перерыв",
    start: "Начало",
    end: "Конец",
    dayOff: "Выходной",
    workDay: "Рабочий день",
    noBreak: "Без перерыва",
    saveSchedule: "Сохранить график",
    scheduleUpdated: "График обновлен",
    scheduleUpdatedDesc: "Ваш рабочий график был успешно обновлен.",

    // Policy Setup translations
    policyTitle: "Шаг 5: Настройки бронирования",
    policyDesc: "Установите настройки бронирования для встреч",
    cancellationPolicy: "Политика отмены",
    cancellationPolicyPlaceholder: "Установите политику отмены для клиентов",
    noPolicy: "Без политики",
    hoursBeforeLabel: "часов до",
    hours12: "За 12 часов",
    hours24: "За 24 часа",
    appointmentGap: "Время между встречами",
    appointmentGapPlaceholder: "Выберите интервал между встречами",
    noGap: "Без интервала",
    minutes5: "5 мин",
    minutes10: "10 мин",
    minutes15: "15 мин",
    custom: "Другое",
    enterMinutes: "Введите минуты",
    requiredFields: "Обязательные поля",
    requiredFieldsDesc: "Пожалуйста, выберите обе опции перед продолжением.",
    customGapRequired: "Укажите интервал",
    customGapDesc: "Пожалуйста, укажите длительность интервала.",
    preferencesSaved: "Настройки сохранены",
    preferencesSavedDesc: "Ваши настройки бронирования успешно сохранены.",

    // Final step
    goToChat: "К чату",
  },
  he: {
    next: "הבא",
    gmailConnected: "שירותי Google מחוברים",
    welcome: "ברוכים הבאים ל-Marguru",
    description: "בוט WhatsApp CRM לאנשי מקצוע בתחום השירות",
    getStarted: "התחל",
    hairdressers: "מעצבי שיער",
    serviceProfs: "אנשי מקצוע בתחום השירות",
    connectServices:
      "חבר את השירותים החיוניים שלך כדי לשחרר את מלוא הפוטנציאל של Marguru.",
    step: "שלב",
    of: "מתוך",
    complete: "הושלם",
    googleServicesTitle: "שלב 1: שירותי Google",
    googleServicesDesc: "חבר שירותי Google לניהול העסק שלך ביעילות.",
    googleServicesBenefits: "יתרונות שירותי Google",
    whatsappTitle: "שלב 2: WhatsApp Business",
    whatsappDesc:
      "חבר את ה-API של WhatsApp Business לאפשר תקשורת אוטומטית עם לקוחות.",
    whatsappBenefits: "יתרונות WhatsApp Business",
    back: "חזור",
    connectGoogle: "התחבר ל-Google",
    connectWhatsApp: "התחבר ל-WhatsApp",
    connecting: "מתחבר אל",
    authorize: "אנא אשר גישה בחלון החדש.",
    connected: "מחובר!",
    integration: "האינטגרציה הצליחה.",
    successMessage: "חיברת בהצלחה את כל השירותים ל-Marguru.",
    botReady: "הבוט Marguru שלך מוכן!",
    readyDescription:
      "אתה יכול כעת להשתמש בכוח המלא של Marguru לנהל את הלקוחות, הפגישות והמסמכים שלך.",
    goDashboard: "עבור ללוח הבקרה",
    copyright: "© 2025 Marguru. כל הזכויות שמורות.",
    driveStore: "אחסן אוטומטית תמונות לפני/אחרי של לקוחות",
    driveOrganize: "ארגן מסמכי לקוחות ורשומות שירות",
    driveAccess: "גש להיסטוריית לקוחות מכל מקום",
    calendarAuto: "תזמון פגישות אוטומטי דרך WhatsApp",
    calendarRemind: "שלח תזכורות פגישות ללקוחות",
    calendarSync: "סנכרן עם היומן הקיים שלך",
    contactsSave: "שמור אוטומטית לקוחות חדשים",
    contactsGroup: "צור קבוצות לקוחות למבצעים ממוקדים",
    contactsTrack: "עקוב אחר העדפות והיסטוריית לקוחות",
    whatsappAuto: "אישורי פגישות אוטומיים",
    whatsappPersonal: "תקשורת מותאמת אישית עם לקוחות",
    whatsappPromo: "שלח הודעות קידום ללקוחות קבועים",
    cancel: "ביטול שינויים",

    // Pricing translations
    pricingTitle: "שלב 3: תמחור שירותים",
    pricingDesc: "הגדר את מחירי השירותים שלך שיהיו גלויים ללקוחות.",
    serviceName: "שם השירות",
    serviceNamePlaceholder: "לדוגמה תספורת",
    duration: "משך זמן",
    durationPlaceholder: "לדוגמה 30 דקות",
    price: "מחיר",
    currency: "מטבע",
    currencyUSD: "USD ($)",
    currencyEUR: "EUR (€)",
    currencyRUB: "RUB (₽)",
    currencyILS: "ILS (₪)",
    currencyGBP: "GBP (£)",
    currencyJPY: "JPY (¥)",
    addService: "הוסף שירות",
    remove: "הסר",
    savePricing: "שמור תמחור",

    // Schedule translations
    scheduleTitle: "שלב 4: לוח זמנים",
    scheduleDesc: "קבע את שעות העבודה וההפסקות שלך לשבוע.",
    weeklySchedule: "לוח זמנים שבועי",
    workingHours: "שעות עבודה",
    breakTime: "זמן הפסקה",
    start: "התחלה",
    end: "סיום",
    dayOff: "יום חופש",
    workDay: "יום עבודה",
    noBreak: "ללא הפסקה",
    saveSchedule: "שמור לוח זמנים",
    scheduleUpdated: "לוח הזמנים עודכן",
    scheduleUpdatedDesc: "לוח הזמנים שלך עודכן בהצלחה.",

    // Policy Setup translations
    policyTitle: "שלב 5: העדפות הזמנה",
    policyDesc: "הגדר את העדפות ההזמנה שלך לפגישות",
    cancellationPolicy: "מדיניות ביטולים",
    cancellationPolicyPlaceholder: "הגדר מדיניות ביטולים ללקוחות שלך",
    noPolicy: "ללא מדיניות",
    hoursBeforeLabel: "שעות לפני",
    hours12: "12 שעות לפני",
    hours24: "24 שעות לפני",
    appointmentGap: "זמן בין פגישות",
    appointmentGapPlaceholder: "בחר רווח זמן בין פגישות",
    noGap: "ללא רווח",
    minutes5: "5 דקות",
    minutes10: "10 דקות",
    minutes15: "15 דקות",
    custom: "מותאם אישית",
    enterMinutes: "הזן דקות",
    requiredFields: "שדות חובה",
    requiredFieldsDesc: "אנא בחר את שתי האפשרויות לפני שתמשיך.",
    customGapRequired: "נדרש רווח זמן מותאם אישית",
    customGapDesc: "אנא ציין את משך הרווח.",
    preferencesSaved: "ההעדפות נשמרו",
    preferencesSavedDesc: "העדפות ההזמנה שלך נשמרו בהצלחה.",

    // Final step
    goToChat: "עבור לצ'אט",
  },
};

export const useTranslation = (language: string = "en") => {
  const safeLanguage = Object.keys(translations).includes(language)
    ? language
    : "en";

  const t = (key: string): string => {
    return translations[safeLanguage][key] || translations.en[key] || key;
  };

  return { t };
};
