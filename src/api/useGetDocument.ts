import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "src/hooks/use-mounted";
import { db } from "src/lib/firebase";

export default function useGetDocument<T>(documentPath: string): { data: T; loading: boolean } {
  const isMounted = useMounted();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const data: T = await getDocument(documentPath);

      if (isMounted()) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, documentPath]);

  useEffect(() => {
    console.log("getDocument");

    getData();
  }, [getData]);

  return { data: data as T, loading };
}

async function getDocument<T>(documentPath: string): Promise<T> {
  const docSnap = await getDoc(doc(db, documentPath));
  const docData = docSnap.data() as T;

  return docData;
}
