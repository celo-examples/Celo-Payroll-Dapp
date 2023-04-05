import React, {useState} from 'react'
import { addEmployee } from '@/interact'
import { useCelo } from '@celo/react-celo'

export default function EmployeeModal(): JSX.Element {
  const [employeeName, setEmployeeName] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [hourlyRate, setHourlyRate] = useState<string>('')
  const { kit, address } = useCelo()

  const handleEmployeeName = (e: React.FormEvent<HTMLInputElement>) => {
    setEmployeeName(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleEmployeeRole = (e: React.FormEvent<HTMLInputElement>) => {
    setRole(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleEmployeeAddress = (e: React.FormEvent<HTMLInputElement>) => {
    setWalletAddress(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleHourlyRate = (e: React.FormEvent<HTMLInputElement>) => {
    setHourlyRate(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleAddEmployee = async () => {
    await addEmployee(address, kit, walletAddress, employeeName, role, hourlyRate)
    window.location.reload()

  }

  return (
  <div>
    <div
      data-te-modal-init
      className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalCenter"
      tabIndex={-1}
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
          <div
            className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel">
                Add Employee
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative p-4">
              <input type="text" placeholder='Employee wallet address address' className='border-2 p-2 mt-2 rounded-md w-full' value={walletAddress} onChange={handleEmployeeAddress} />
                <input type="text" placeholder='Name' className='border-2 p-2 mt-2 rounded-md w-full' value={employeeName} onChange={handleEmployeeName}/>
                <input type="text" placeholder='Role' className='border-2 p-2 mt-2 rounded-md w-full' value={role} onChange={handleEmployeeRole} />
                <input type="number" placeholder='Hourly Rate' className='border-2 p-2 mt-2 rounded-md w-full' value={hourlyRate} onChange={handleHourlyRate} />
            </div>
            <div
              className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
                Close
              </button>
              <button
                onClick={handleAddEmployee}
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Add employee
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}
