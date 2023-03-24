
import React from 'react'
import { useState, useEffect } from "react";
import Pagination from "../patientSearch/Pagination";
import {getCsvFiles} from './csv.resource';
//import { getCsvFiles } from "./csv.resource";

const DisplayCSV = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(5);
  const indexOfLastPatient = currentPage * dataPerPage;
  const indexOfFirstPatients = indexOfLastPatient - dataPerPage;
  const currentData = data.slice(
    indexOfFirstPatients,
    indexOfLastPatient
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchCsvFiles = async () => {
      const res = await getCsvFiles();
      const response = await res.json();
      setData(response);
    };
    fetchCsvFiles();
  }, []);




  
  return (
    <div className="w-[60%] mx-auto mt-[17%]">
      <div>
      {currentData.length > 0 && (
       <>
        <span className="text-xl font-bold pb-4">Total Records: {data.length}</span>
          <div className="overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-blue-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Uploaded time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item: any) => (
                <>
                  <tr
                    className="bg-white border-b"
                    key={item.id}
                  >
                    <td className="px-6 py-4">{item.file_name}</td>
                    <td className="px-6 py-4">{item.upload_time}</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          item.file_type == "VL"
                            ? "bg-green-500 py-2 px-3 text-white"
                            : "bg-btnColor p-2 text-white"
                        }`}
                      >
                        {item.file_type}
                      </span>
                    </td>
                    <td className="px-4 py-2 "><button className="bg-blue-400 p-2 rounded-md cursor-pointer text-white">SYNC</button></td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
       </>
      )}
     {dataPerPage && (
                      <Pagination
                        patientsPerPage={dataPerPage}
                        totalPatients={data.length}
                        paginate={paginate}
                      />
                    )}
      </div>
    </div>
  );
};
export default DisplayCSV;