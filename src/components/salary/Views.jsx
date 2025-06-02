import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Views = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/v1/salary/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      console.log(response.data);

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.log("API Error", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const query = e.target.value;
    if (!salaries) return;

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId?.employeeId?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  if (!filteredSalaries) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overflow-x-auto p-5'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Salary History</h2>
      </div>

      <div className='my-4'>
        <input
          type='text'
          placeholder='Search by employee ID'
          className='border px-2 py-1 rounded-md border-gray-300'
          onChange={filterSalaries}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 bg-gray-50 border border-gray-200'>
            <tr>
              <th className='px-6 py-3'>SNO</th>
              <th className='px-6 py-3'>EMP ID</th>
              <th className='px-6 py-3'>Salary</th>
              <th className='px-6 py-3'>Allowance</th>
              <th className='px-6 py-3'>Deduction</th>
              <th className='px-6 py-3'>Total Pay</th>
              <th className='px-6 py-3'>Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary) => (
              <tr
                key={salary._id}
                className='bg-white border-b dark:border-gray-400'
              >
                <td className='px-6 py-3'>{sno++}</td>
                <td className='px-6 py-3'>{salary.employeeId?.employeeId}</td>
                <td className='px-6 py-3'>{salary.basicSalary}</td>
                <td className='px-6 py-3'>{salary.allowances}</td>
                <td className='px-6 py-3'>{salary.deductions}</td>
                <td className='px-6 py-3'>{salary.netSalary}</td>
                <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No records found.</div>
      )}
    </div>
  );
};

export default Views;
