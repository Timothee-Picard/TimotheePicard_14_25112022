import {Link} from "react-router-dom";
import EnhancedTable from "../../components/table/table.jsx"
export default function EmployeeList() {
  return (
    <>
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <div>
              <EnhancedTable />
            </div>
        </div>
    </>
  )
}
