import { createCollection, db } from "@app/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export type BookingDate = {
  [key: `station_${number}`]: string[];
};

export function getSystemBookingURL(date: string): string {
  return `${getSystemBookingsURL()}/${date}`;
}

export function getSystemBookingsURL(): string {
  return "systemBookings";
}

export function formatDate(date: Date): string {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export async function setSystemBooking(date: Date, station: keyof BookingDate, time: string): Promise<void> {
  const systemBookingUrl = getSystemBookingURL(formatDate(date));

  const docRef = doc(db, systemBookingUrl);

  const docSnap = await getDoc(docRef);
  const docData = docSnap.data() as BookingDate;

  if (docData) {
    if (docData[station]) {
      const newData: BookingDate = { ...docData, [station]: [...docData[station], time] };
      updateDoc(docRef, newData);
    } else {
      const newData: BookingDate = { [station]: [time] };
      updateDoc(docRef, newData);
    }
  } else {
    const systemBookingCollection = createCollection<BookingDate>(getSystemBookingsURL());
    const ref = doc(systemBookingCollection, formatDate(date));
    const data: BookingDate = { [station]: [time] };
    setDoc(ref, data);
  }
}

export async function deleteSystemBooking(date: Date, station: keyof BookingDate, time: string) {
  const userBookingUrl = getSystemBookingURL(formatDate(date));

  const docRef = doc(db, userBookingUrl);

  const docSnap = await getDoc(docRef);
  const docData = docSnap.data() as BookingDate;

  const newData: BookingDate = {
    ...docData,
    [station]: docData[station].filter((timeInTheArray) => timeInTheArray !== time),
  };

  updateDoc(docRef, newData);
}
