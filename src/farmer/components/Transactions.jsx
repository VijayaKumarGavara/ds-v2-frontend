import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const farmer_id = "F1769576873058";
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/farmer/transactions?farmer_id=${farmer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setTransactions(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <div>Transactions</div>
      {transactions.map((t, index) => {
        return (
          <div key={index}>
            <div>
              {t.buyer_name} -{" "}
              {new Date(t.createdAt).toISOString().split("T")[0]}
            </div>
            <div>
              <span className=" font-medium ">{t.amount}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Transactions;
