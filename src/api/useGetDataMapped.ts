import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "src/hooks/use-mounted";
import { db } from "src/lib/firebase";

export default function useGetDataMapped<T>(collectionPath: string): { data: { [key: string]: T }; loading: boolean } {
  const isMounted = useMounted();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const data = await getCollectionMapped(collectionPath);

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

async function getCollectionMapped<T>(collectionPath: string) {
  const querySnapshot = await getDocs(collection(db, collectionPath));

  const result: { [key: string]: T } = {};

  querySnapshot.forEach((doc) => {
    const test = doc.id;
    result[test] = doc.data() as T;
  });

  return result;
}
