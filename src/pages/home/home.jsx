import {Link} from "react-router-dom";
import FormCreate from "../../components/formCreate/formCreate"

import Modal from  "my-react-modal"

export default function Home() {

    const handleSubmit = (e) => {
        e.preventDefault()
        const {
            "first-name": firstName,
            "last-name": lastName,
            "date-of-birth": dateOfBirth,
            "start-date": startDate,
            street,
            city,
            state,
            "zip-code": zipCode,
            department
        } = e.target.elements

        const employees = JSON.parse(localStorage.getItem('employees')) || [];

        const employee = {
            firstName: firstName.value,
            lastName: lastName.value,
            dateOfBirth: dateOfBirth.value,
            startDate: startDate.value,
            department: department.value,
            street: street.value,
            city: city.value,
            state: state.value,
            zipCode: zipCode.value
        };

        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));

        console.log('Success')
    }

  return (
    <>
        <div className="container">
            <h2>Create Employee</h2>
            <FormCreate />
        </div>
    </>
  )
}
