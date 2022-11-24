import { db } from "@app/lib/firebase";
import { doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore";

export type CompletedProgram = {
  programId: string;
  completed: number;
};

export function getCompletedProgramsURL(userId: string) {
  return `users/${userId}/completedPrograms`;
}

export function getCompletedProgramURL(userId: string, programId: string) {
  return `${getCompletedProgramsURL(userId)}/${programId}`;
}

export async function updateCompletedProgramDB(userId: string, programId: string) {
  const completedProgramUrl = getCompletedProgramURL(userId, programId);
  const docRef = doc(db, completedProgramUrl);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data() as CompletedProgram;
    const newCompletions = docData.completed + 1;
    const completedProgram: Partial<CompletedProgram> = { completed: newCompletions };
    await updateDoc(docRef, completedProgram);
  } else {
    const completedProgram: CompletedProgram = { programId, completed: 1 };
    await setDoc(docRef, completedProgram);
  }
}
