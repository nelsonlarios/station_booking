import { createCollection, db } from "@app/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { BookingDate, formatDate } from "./systemBookings";

export function getUserBookingURL(userId: string, date: Date): string {
  return `users/${userId}}/bookings/${formatDate(date)}`;
}

export function getUserBookingsURL(userId: string): string {
  return `users/${userId}}/bookings`;
}

export async function setUserBooking(
  userId: string,
  date: Date,
  station: keyof BookingDate,
  time: string
): Promise<void> {
  const userBookingUrl = getUserBookingURL(userId, date);

  const docRef = doc(db, userBookingUrl);

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
    const userBookingCollection = createCollection<BookingDate>(getUserBookingsURL(userId));
    const ref = doc(userBookingCollection, formatDate(date));
    const data: BookingDate = { [station]: [time] };
    setDoc(ref, data);
  }
}

export async function deleteUserBooking(userId: string, date: Date, station: keyof BookingDate, time: string) {
  const userBookingUrl = getUserBookingURL(userId, date);

  const docRef = doc(db, userBookingUrl);

  const docSnap = await getDoc(docRef);
  const docData = docSnap.data() as BookingDate;

  const newData: BookingDate = {
    ...docData,
    [station]: docData[station].filter((timeInTheArray) => timeInTheArray !== time),
  };

  updateDoc(docRef, newData);
}
