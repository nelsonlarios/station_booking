export type Program = {
  id: string;
  title: string;
  minutes: number;
  shuttles: number;
  rounds: number;
  description: string;
};

export const programs: Program[] = [
  {
    id: "program_1",
    title: "Program 1",
    minutes: 25,
    shuttles: 455,
    rounds: 25,
    description:
      "Fundamental exercises with long sets, focusing on speed and shot quality. A good introduction to multifeed training.",
  },
  {
    id: "program_2",
    title: "Program 2",
    minutes: 30,
    shuttles: 452,
    rounds: 25,
    description: "Explosive power and improving court coverage. Another good introduction to multifeed training.",
  },
  {
    id: "program_3",
    title: "Program 3",
    minutes: 30,
    shuttles: 424,
    rounds: 3,
    description: "Explosive power and speed, with lots of jumping.",
  },
  {
    id: "program_4",
    title: "Program 4",
    minutes: 35,
    shuttles: 554,
    rounds: 25,
    description: "Explosive power and patterned movements along with endurance.",
  },
];

export function getProgramURL(programId: string) {
  return `${getProgramsURL()}/${programId}`;
}

export function getProgramsURL() {
  return "programs";
}
