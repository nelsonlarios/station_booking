import { collection, onSnapshot, query, Unsubscribe } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "src/hooks/use-mounted";
import { db } from "src/lib/firebase";

export default function useGetCollectionRT<T>(collectionPath: string): { data: T[]; loading: boolean } {
  const isMounted = useMounted();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const q = query(collection(db, collectionPath));

      const unsub = onSnapshot(q, (querySnapshot) => {
        const docs: T[] = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data() as T);
        });
        if (isMounted()) {
          setData(docs);
          setLoading(false);
        }
      });

      return unsub;
    } catch (err) {
      console.error(err);
    }
  }, [collectionPath, isMounted]);

  useEffect(() => {
    let unsub: Unsubscribe | undefined = undefined;
    async function fetchData() {
      unsub = await getData();
    }

    fetchData();

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [getData]);

  return { data, loading };
}
