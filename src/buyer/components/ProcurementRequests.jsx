import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
import RequestCard from "./RequestCard";

const ProcurementRequests = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const buyer_id = "B123";
  useEffect(() => {
    async function fetchProcurementRequests() {
      try {
        const response = await fetch(
          `${API_URL}/api/buyer/procurement-requests?buyer_id=${buyer_id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        if (!response.ok) {
          throw new Error("Error while fetching the procurement requests");
        }
        const jsonResponse = await response.json();
        setProcurementRequests(jsonResponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProcurementRequests();
  }, []);
  return (
    <>
      <h1>Procurement Requests</h1>
      {procurementRequests?.map((request) => {
        return <RequestCard request={request} key={request.request_id} />;
      })}
    </>
  );
};

export default ProcurementRequests;
