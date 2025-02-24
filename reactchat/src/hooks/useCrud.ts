import { useEffect, useState } from "react";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";

interface IuseCrud<T> {
  dataCRUD: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`);
      const data = response.data;
      setDataCRUD(data);
      setError(null);
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 400) {
        setError(new Error("400"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch data when hook is used
  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when component mounts

  return { fetchData, dataCRUD, error, isLoading };
};

export default useCrud;
