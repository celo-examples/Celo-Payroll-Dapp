//SPDX-License-Identifier:GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract Payroll {

    using Counters for Counters.Counter;
    Counters.Counter public employeeId;

    struct EmployeeInfo {
        uint256 id;
        address payable employeeWalletAddress;
        string name;
        string role;
        uint256 salary;
        uint256 lastPayday;
        uint256 tokenBal;
    }

   event LogEmployeeInfo(uint256 id, address employeeWalletAddress, string name, string role, uint256 salary, uint256 lastPayday);
   event LogEmployeeUpdate(uint256 _index, uint256 _salary);
   event LogEmployeePayday(uint256 _payout);

    EmployeeInfo[] public employeeList;
    address payable owner;
    IERC20 AfricToken;

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the Payroll Manager");
        _;
    }

    mapping(address => bool) public isExist;

    constructor(address tokenAddress) {
        owner = payable(msg.sender);
        AfricToken = IERC20(tokenAddress);
    }

    function addEmployee(address payable _employeeAddress,  string memory _name, 
    string memory _role, uint256 _salary) public onlyOwner {
        require(isExist[_employeeAddress] != true, "Employee already added");
        employeeId.increment();
        uint256 _id = employeeId.current();
        uint256 tokenbal = 0;        
        employeeList.push(EmployeeInfo(_id, _employeeAddress, _name, _role, _salary, block.timestamp, tokenbal));
        isExist[_employeeAddress] = true;
        emit LogEmployeeInfo(_id, _employeeAddress, _name, _role, _salary, block.timestamp);
    }

    function removeEmployee(address _employeeAddress) public onlyOwner {
        for (uint i = 0; i < employeeList.length; i++) {
            if (employeeList[i].employeeWalletAddress == _employeeAddress) {
                employeeList[i] = employeeList[employeeList.length - 1];
                employeeList.pop();
                break;
            }
        }
    }

    function removeEmployees() public onlyOwner {
        delete employeeList;
    }

    function getEmployeeInfo(uint256 index) public view onlyOwner returns (
            uint256 id,
            address employeeWalletAddress,
            string memory name,
            string memory role,
            uint256 salary,
            uint256 lastPayday
        ) {
            return(
                employeeList[index].id,
                employeeList[index].employeeWalletAddress,
                employeeList[index].name,
                employeeList[index].role,
                employeeList[index].salary,
                employeeList[index].lastPayday
            );
        }

     function getEmployeeCount() public onlyOwner view returns (uint256) {
         return employeeList.length;
    }

    function getEmployees() public onlyOwner view returns (EmployeeInfo[] memory){
        return employeeList;
    }

    function updateEmployeeSalary(uint256 _index, uint256 _newSalary) public onlyOwner{
        EmployeeInfo storage employee = employeeList[_index];
        employee.salary = _newSalary;   
        emit LogEmployeeUpdate(_index, _newSalary);     
    }

    // Pay employee salary. Called by the contract owner
    function employeePayDay(uint256 _index) public {
        uint256 currentTime = block.timestamp;
        uint256 duration = currentTime - employeeList[_index].lastPayday;
        uint256 payout = duration * employeeList[_index].salary;
        employeeList[_index].lastPayday = currentTime;
 
        // send payment to employee
        AfricToken.transfer(payable(employeeList[_index].employeeWalletAddress), AfricToken.balanceOf(address(this)) - payout);   
        employeeList[_index].tokenBal = AfricToken.balanceOf(employeeList[_index].employeeWalletAddress) + payout;
  
        emit LogEmployeePayday(payout);

        // send balance to contract owner
        AfricToken.transfer(payable(msg.sender), AfricToken.balanceOf(address(this)) - payout);
        emit LogEmployeePayday(AfricToken.balanceOf(address(this)) - payout);
    }


     // Function to calculate employee's salary payout and send them their wages
    function payEmployees() public payable onlyOwner{     
        require(AfricToken.balanceOf(address(this)) != 0, "You dont have the token");       
        // Calculate the sum of all employee salaries and the timestamp of payday
        uint totalSalary = 0;
        uint timestamp = block.timestamp;
        for (uint i = 0; i < employeeList.length; i++) {
            EmployeeInfo storage employee = employeeList[i];
            uint256 duration = timestamp /1000 - employee.lastPayday;
            uint256 hoursSpent = duration/3600;
            uint256 payout = hoursSpent * employee.salary;
            employee.lastPayday = timestamp;
            totalSalary += payout;

            // Send the payout to the employee
            AfricToken.transfer(employee.employeeWalletAddress, AfricToken.balanceOf(address(this)) - payout);   
            employee.tokenBal = AfricToken.balanceOf(employee.employeeWalletAddress) + payout;  
            emit LogEmployeePayday(payout);

        }
        
        // Send any remaining balance to the owner
        uint256 tokenBal = AfricToken.balanceOf(address(this)) - totalSalary;
        AfricToken.transfer(msg.sender, tokenBal);     
        emit LogEmployeePayday(tokenBal);
    }

}