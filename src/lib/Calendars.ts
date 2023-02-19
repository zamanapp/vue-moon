// https://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
export enum Calendars {
  GENERAL = "islamic",
  CIVIC = "islamic-civil",
  TABULAR = "islamic-tbla",
  UMM_AL_QURA = "islamic-umalqura",
  SIGHTING_SA = "islamic-rgsa",
}

export const calendarsValues = Object.values(Calendars);
