export enum Section {
  WarmUp = "Warm Up",
  One = "Section 1",
  Two = "Section 2",
  Three = "Section 3",
}

export type Routine = {
  id: `routine_${number}`;
  programId: `program_${number}`;
  rounds: number;
  shuttles: number;
  totalShuttles: number;
  section: Section;
  description: string;
  title: string;
  videoUrl: string;
};
