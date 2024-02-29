import axios from "@utils/axios";
import { useEffect, useState } from "react";

type Good = {
  id: string;
  brand: string;
  price: number;
  product: string;
};

function App() {
  const [ids, setIds] = useState<string[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         API_URL,
  //         {
  //           action: "get_ids",
  //           params: { offset: 0, limit: 50 },
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-Auth": `${md5(`Valantis_${timestamp}`)}`,
  //           },
  //           transformResponse: [
  //             function (data) {
  //               const { result }: { result: string[] } = JSON.parse(data);
  //               const list = new Set(result);
  //               return Array.from(list);
  //             },
  //           ],
  //         }
  //       );
  //       setIds(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const timeoutID = setTimeout(fetch);
  //   return () => clearTimeout(timeoutID);
  // }, []);
  // получение товаров по id
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          "/",
          {
            action: "get_items",
            params: { ids },
          },
          {
            transformResponse: [
              function (data) {
                const { result }: { result: Good[] } = JSON.parse(data);
                const uniqGoods: Good[] = result.reduce((acc, good) => {
                  const { id } = good;
                  const isListed = acc.find((good) => good.id === id);
                  return isListed ? acc : acc.concat([good]);
                }, [] as Good[]);
                return uniqGoods;
              },
            ],
          }
        );
        setGoods(data);
      } catch (error) {
        console.log(error);
      }
    };
    const timeoutID = setTimeout(fetch);
    return () => clearTimeout(timeoutID);
  }, [ids]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          "/",
          {
            action: "filter",
            params: { product: "колье" },
          },
          {
            transformResponse: [
              function (data) {
                const { result } = JSON.parse(data);
                const list = new Set(result);
                return Array.from(list);
              },
            ],
          }
        );
        setIds(data);
      } catch (error) {
        console.log(error);
      }
    };
    const timeoutID = setTimeout(fetch);
    return () => clearTimeout(timeoutID);
  }, []);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         API_URL,
  //         {
  //           action: "get_fields",
  //           params: {field: "price"},
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-Auth": `${md5(`Valantis_${timestamp}`)}`,
  //           },
  //           transformResponse: [
  //             function (data) {
  //               const { result } = JSON.parse(data);
  //               const list = new Set(result);
  //               return Array.from(list);
  //             },
  //           ],
  //         }
  //       );
  //       setGoods(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const timeoutID = setTimeout(fetch);
  //   return () => clearTimeout(timeoutID);
  // }, []);
  return (
    <>
      <p>Список имеет длину: {goods.length}</p>
      <ol>
        {goods.map((good) => (
          <li key={good.id}>{JSON.stringify(good)}</li>
        ))}
      </ol>
    </>
  );
}

export default App;
