import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "src/hooks/use-mounted";
import { db } from "src/lib/firebase";

export default function useGetCollection<T>(collectionPath: string): { data: T[]; loading: boolean } {
  const isMounted = useMounted();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const data: T[] = await getCollection(collectionPath);

      if (isMounted()) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, collectionPath]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading };
}

async function getCollection<T>(collectionPath: string) {
  const querySnapshot = await getDocs(collection(db, collectionPath));

  const result: T[] = [];

  querySnapshot.forEach((doc) => {
    result.push(doc.data() as T);
  });

  return result;
}
