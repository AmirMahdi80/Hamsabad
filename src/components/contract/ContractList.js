// import React, { useState, useEffect } from "react";
// import { contractService } from "../../services/contractService";

// const ContractList = () => {
//   const [contracts, setContracts] = useState([]);

//   useEffect(() => {
//     const fetchContracts = async () => {
//       const data = await contractService.getContracts();
//       setContracts(data);
//     };
//     fetchContracts();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">لیست قراردادها</h2>
//       <ul>
//         {contracts.map((contract) => (
//           <li key={contract.id} className="p-4 mb-4 bg-white rounded shadow">
//             <h3 className="text-xl font-bold">{contract.name}</h3>
//             <p>{contract.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ContractList;
