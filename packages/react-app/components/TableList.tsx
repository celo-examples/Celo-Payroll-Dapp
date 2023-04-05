import React,{ useState, useEffect } from 'react'
import { useCelo } from '@celo/react-celo'
import { getEmployees, removeEmployee, employeePayDay } from '@/interact'
import UpdateModal from './UpdateModal'
interface Iparam{
  id: number,
  employeeAddress: string
  name: string,
  role: string,
  payRate: number,
  lastpayday: number,
  tokenBal: number
}

export default function TableList(): JSX.Element {
  const { kit, address } = useCelo()
  const [employees, setEmployees] = useState<any[]>([])

  const handleEmployees = async () => {
    const employeeList = await getEmployees(kit)
    setEmployees(employeeList)
  }

  const handleRemoveEmployee = async (employeeWalletAddress : string) => {
    await removeEmployee(address, kit, employeeWalletAddress)
    window.location.reload()
  }

  const handlePayEmployee = async (index : number) => {
    await employeePayDay(address, kit, index)
    window.location.reload()
  }

  const formateTime = (lastpayday: number) => {
    const hoursAgo = Math.round((Date.now() / 1000 - lastpayday) / 3600);
    return `${hoursAgo} hours ago `
  }

  useEffect(() => {
    handleEmployees()
  }, [kit])

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Id</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Role</th>
                    <th scope="col" className="px-6 py-4">Employee Address</th>
                    <th scope="col" className="px-6 py-4">Hourly Rate (CELO)</th>
                    <th scope="col" className="px-6 py-4">Hours Worked</th>
                    <th scope="col" className="px-6 py-4">Token Bal Worked</th>
                    <th scope="col" className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!employees ? <div>Employee not yet added</div> : employees.map((item, index) => <tr className="border-b dark:border-neutral-500" key={index}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.role}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.employeeWalletAddress}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.salary}</td>
                    <td className="whitespace-nowrap px-6 py-4">{formateTime(item.lastPayday)}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.tokenBal}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                    <button
                      type="button"
                      className="inline-block rounded bg-yellow-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-toggle="modal"
                      data-te-target="#updateModal"
                      data-te-ripple-init
                      data-te-ripple-color="light">
                      Update
                      </button>
                      <UpdateModal employeeId={item.id -1} />
                      <button onClick={() => handleRemoveEmployee(item.employeeWalletAddress)} className='bg-red-500 p-2 border rounded text-white'>Remove</button>
                      <button onClick={() =>handlePayEmployee(item.id)} className='bg-teal-500 p-2 border rounded text-white'>Pay</button>
                    </td>
                  </tr>)}                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
