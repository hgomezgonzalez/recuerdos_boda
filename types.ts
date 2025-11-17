export interface Participant {
  name: string;
  memory: string;
  imageURL: string;
}

export type AppState = "upload" | "grid" | "spinning" | "winner" | "finished";

export interface AudioFile {
  name: string;
  path: string;
  audio?: HTMLAudioElement;
}
