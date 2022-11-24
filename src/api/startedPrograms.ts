import { createCollection, db } from "@app/lib/firebase";
import {
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getCompletedProgramURL } from "./completedPrograms";

export const routineCheckboxes = "routineCheckboxes";

interface test extends DocumentData {
  programId: string;
}

export type StartedProgram = {
  programId: string;
  routineCheckboxes: { [key: string]: boolean };
  completed: number;
};

export type RoutineCheckbox = `routine_${number}_${number}`;

export type RoutineCheckboxPath = `${keyof Pick<StartedProgram, "routineCheckboxes">}.${RoutineCheckbox}`;

export function getStartedProgramsURL(userId: string) {
  return `users/${userId}/startedPrograms`;
}

export function getStartedProgramURL(userId: string, programId: string) {
  return `${getStartedProgramsURL(userId)}/${programId}`;
}

function getStartedProgramCollection(userId: string): CollectionReference<StartedProgram> {
  return createCollection<StartedProgram>(getStartedProgramsURL(userId));
}

export function setStartedProgramDB(userId: string, programId: StartedProgram["programId"]) {
  const completedProgramCol = getStartedProgramCollection(userId);
  const ref = doc(completedProgramCol, programId);
  const data: StartedProgram = { programId: programId, routineCheckboxes: {}, completed: 0 };
  setDoc(ref, data);

  // const ref = doc(db, getStartedProgramURL(userId, programId));
  // const data: StartedProgram = { programId: programId, routineCheckboxes: {}, completed: 0 };
  // setDoc(ref, data);
}

export async function deletedStartedProgramDB(userId: string, programId: StartedProgram["programId"]) {
  const ref = doc(db, getStartedProgramURL(userId, programId));
  await deleteDoc(ref);
}

export async function updateRoutineCheckboxDB(
  userId: string,
  programId: string,
  routineCheckbox: RoutineCheckbox,
  value: boolean
) {
  const ref = doc(db, getStartedProgramURL(userId, programId));
  const path: RoutineCheckboxPath = `routineCheckboxes.${routineCheckbox}`;
  await updateDoc(ref, { [path]: value });
}

export async function updateStartedProgramDB(
  userId: string,
  programId: string,
  routineCheckbox: RoutineCheckbox,
  value: boolean
) {
  const startedProgramUrl = getStartedProgramURL(userId, programId);
  const docRef = doc(db, startedProgramUrl);

  const docSnap = await getDoc(docRef);
  const docData = docSnap.data() as StartedProgram;

  const path: RoutineCheckboxPath = `routineCheckboxes.${routineCheckbox}`;

  if (value) {
    const newStartedProgram: Partial<StartedProgram> = { completed: docData?.completed + 1, [path]: value };
    updateDoc(docRef, newStartedProgram);
  } else {
    const newStartedProgram: Partial<StartedProgram> = { completed: docData?.completed - 1, [path]: value };
    updateDoc(docRef, newStartedProgram);
  }
}

// export async function updateStartedProgramDB(
//   userId: string,
//   programId: string,
//   routineCheckbox: RoutineCheckbox,
//   value: boolean
// ) {
//   const startedProgramUrl = getStartedProgramURL(userId, programId);
//   const docRef = doc(db, startedProgramUrl);

//   const path: RoutineCheckboxPath = `routineCheckboxes.${routineCheckbox}`;
//   try {
//     await runTransaction(db, async (transaction) => {
//       const sfDoc = await transaction.get<DocumentData>(docRef);
//       if (value) {
//         const newStartedProgram: Partial<StartedProgram> = { completed: sfDoc.data()?.completed + 1, [path]: value };
//         transaction.update(docRef, newStartedProgram);
//       } else {
//         const newStartedProgram: Partial<StartedProgram> = { completed: sfDoc.data()?.completed - 1, [path]: value };
//         transaction.update(docRef, newStartedProgram);
//       }
//     });
//     console.log("Transaction successfully committed!");
//   } catch (e) {
//     console.log("Transaction failed: ", e);
//   }
// }
