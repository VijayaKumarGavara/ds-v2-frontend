import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const buyer_id = "B123";
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/transactions?buyer_id=${buyer_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) {
          throw new Error("Error while fetching your transactions");
        }
        const jsonResponse = await response.json();
        setTransactions(jsonResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTransactions();
  }, []);
  return (
    <>
      <h1>Transactions</h1>
      <div >
        {transactions.map((t) => {
          return (
            <div key={t.transactions_id} className="border rounded-md px-2 max-w-max m-5">
              <div className="flex ">
                {t.farmer_name}-{t.amount}
              </div>
              <span>{new Date(t.createdAt).toISOString().split("T")[0]}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Transactions;
