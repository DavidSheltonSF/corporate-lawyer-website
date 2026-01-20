export type HearingPersistence = {
  _id: { toString(): string };
  date: Date;
  location: string;
  description?: string;
};
