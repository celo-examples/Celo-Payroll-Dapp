import payrollABI from "./Payroll.json"
import tokenABI from "./AfricToken.json"

const payrollAddress = "0x1646c766585520dF8d2dCa37396f7F4372297d0c";
const tokenAddress = "0xdfBF46e557612966b2e55d230376E1a6C8D71297";

export function initContract(kit: any, abi: any, contractAddress: string) {
  return new kit.connection.web3.eth.Contract(abi, contractAddress)
} 

// Payroll Contract Calls
export const addEmployee = async (address: string | null | undefined,
  kit: any, employeeAddress: string, name: string, role: string, salary: string) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .addEmployee(employeeAddress, name, role, salary).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const removeEmployee = async (address: string | null | undefined,
  kit: any, employeeAddress: string) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .removeEmployee(employeeAddress).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const removeEmployees = async (address: string | null | undefined,
  kit: any) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .removeEmployees().send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const updateEmployeeSalary = async (address: string | null | undefined,
  kit: any, index: number, newSalary: string) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .updateEmployeeSalary(index, newSalary).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const employeePayDay = async (address: string | null | undefined,
  kit: any, index: number) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .employeePayDay(index).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const payEmployees = async (address: string | null | undefined,
  kit: any) => {
  try {
    const txHash = await initContract(kit, payrollABI.abi, payrollAddress).methods
      .payEmployees().send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getEmployee = async (kit: any, employeeAddress: string) => {
  try {
    const employee = await initContract(kit, payrollABI.abi, payrollAddress).methods.getEmployee(employeeAddress).call()
    console.log(employee)
    return employee;
  } catch (e) {
    console.log(e)
  }
}

export const getEmployeeInfo = async (kit: any, index: number) => {
  try {
    const employee = await initContract(kit, payrollABI.abi, payrollAddress).methods.getEmployeeInfo(index).call()
    console.log(employee)
    return employee;
  } catch (e) {
    console.log(e)
  }
} 

export const getEmployeeCount = async (kit: any) => {
  try {
    const employeeCount = await initContract(kit, payrollABI.abi, payrollAddress).methods.getEmployeeCount().call()
    console.log(employeeCount)
    return employeeCount;
  } catch (e) {
    console.log(e)
  }
} 

export const getEmployees = async (kit: any) => {
  try {
    const employees = await initContract(kit, payrollABI.abi, payrollAddress).methods.getEmployees().call()
    console.log(employees)
    return employees;
  } catch (e) {
    console.log(e)
  }
} 

// Token Contract Calls
export const transferToken = async (address: string | null | undefined,
  kit: any, employeeAddress: string, amount: string) => {
  try {
    const txHash = await initContract(kit, tokenABI.abi, tokenAddress).methods
      .transfer(employeeAddress, amount).send({
        from: address,
        value: amount
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getTokenBalance = async (kit: any, account: string) => {
  try {
    const employees = await initContract(kit, payrollABI.abi, payrollAddress).methods.balanceOf(account).call()
    console.log(employees)
    return employees;
  } catch (e) {
    console.log(e)
  }
}
