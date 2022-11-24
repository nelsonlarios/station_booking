import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "src/hooks/use-mounted";
import { db } from "src/lib/firebase";

export default function useGetDocumentRT<T>(documentPath: string): { data: T; loading: boolean } {
  const isMounted = useMounted();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const unsub = onSnapshot(doc(db, documentPath), (doc) => {
        const data = doc.data() as T;

        if (isMounted()) {
          setData(data);
          setLoading(false);
        }
      });

      return unsub;
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, documentPath]);

  useEffect(() => {
    console.log("useGetDocumentRT");

    let unsub: Unsubscribe | undefined;
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

  return { data: data as T, loading };
}
