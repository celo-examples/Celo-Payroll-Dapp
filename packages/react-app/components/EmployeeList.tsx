import React from 'react'
import TableList from './TableList'

interface IParam {
  id: number,
  employeeAddress: string
  name: string,
  role: string,
  payRate: number,
  lastpayday: number
}
export default function EmployeeList(param: IParam): JSX.Element{

  return (
    <div className="flex text-xl">
      <div>
        {/* <TableList/> */}
      </div>
    </div>
  )
}
