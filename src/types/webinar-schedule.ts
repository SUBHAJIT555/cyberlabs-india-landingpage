export type WebinarSpeaker = {
  name: string;
  title: string;
};

export type WebinarSession = {
  id: string;
  scheduledAt: string;
  topic: string;
  speakers: WebinarSpeaker[];
  registrationOpen?: boolean;
};

export type WebinarScheduleContent = {
  eyebrow: string;
  title: string;
  description: string;
  tableHeading: string;
  tableColumns: {
    date: string;
    time: string;
    details: string;
    action: string;
  };
  topicsLabel: string;
  speakersLabel: string;
  registerLabel: string;
  whatsappLabel: string;
  detailsModalEyebrow: string;
  sessionEndedLabel: string;
  upcomingLabel: string;
  completedLabel: string;
};

export type BackgroundOption = string;

export type MainSiteWebinarSchedule = {
  upcomingWebinars: WebinarSession[];
  webinarScheduleContent: WebinarScheduleContent;
  defaultWebinarSpeakers: WebinarSpeaker[];
  backgroundOptions: readonly BackgroundOption[];
  webinarWhatsappNumber: string;
};
