import { Button, FormGroup, Stack, FormLabel, FormControl, MenuItem, TextField, Box, Divider, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { states } from "../../assets/states";
import {EmployeeContext} from '../../contexte/store'

import {useState, useContext} from "react";
import Modal from "my-react-modal";
import {Link} from "react-router-dom";

export default function FormCreate() {
    const {employees, setEmployees} = useContext(EmployeeContext)

    const [isShowing, setIsShowing] = useState(false)
    const [modalMessage, setModalMessage] = useState([])
    const [typeMessage, setTypeMessage] = useState("")

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [department, setDepartment] = useState('');
    
    const departmentList = [
        {
            name: "Sales",
            value: "sales"
        },
        {
            name: "Marketing",
            value: "marketing"
        },
        {
            name: "Engineering",
            value: "engineering"
        },
        {
            name: "Human Resources",
            value: "humanResources"
        },
        {
            name: "Legal",
            value: "legal"
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        let errorDatas = false

        setModalMessage([])

        if(!firstName.trim().length > 0) {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- First Name required"])
            setIsShowing(true)
            errorDatas = true
        }
        if(!lastName.trim().length > 0) {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- Last Name required"])
            setIsShowing(true)
            errorDatas = true
        }
        if(startDate === null) {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- Start Date required"])
            setIsShowing(true)
            errorDatas = true
        }
        else if(startDate.$d == "Invalid Date") {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- Start Date  invalid"])
            setIsShowing(true)
            errorDatas = true
        }

        if(dateOfBirth === null) {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- Date of Birth required"])
            setIsShowing(true)
            errorDatas = true
        }
        else if(dateOfBirth.$d == "Invalid Date") {
            setTypeMessage("error")
            setModalMessage(current => [...current, "- Date of Birth  invalid"])
            setIsShowing(true)
            errorDatas = true
        }
        
        if(errorDatas) {
            return
        }
        try {
            setEmployees([...employees, {
                id: Math.max(...employees.map(e => e.id)) + 1,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                startDate: new Date(startDate.$d),
                department: department,
                dateOfBirth: new Date(dateOfBirth.$d),
                street: street.trim(),
                city: city.trim(),
                state: state,
                zipCode: zipCode
            }])

            // Reset form data
            setFirstName('')
            setLastName('')
            setDateOfBirth(null)
            setStartDate(null)
            setStreet('')
            setCity('')
            setState('')
            setZipCode('')
            setDepartment('')

            setTypeMessage("success")
            setModalMessage( ["Employee Created!"])
            setIsShowing(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal isShowing={isShowing} hide={() => setIsShowing(false)} messages={modalMessage} title="Creation" type={typeMessage}>
                {typeMessage === "error" ? (
                    <a className="modal-action" href="#top" onClick={() => setIsShowing(false)}>Retour</a>
                ) : (
                    <>
                        <a className="modal-action" href="#top" onClick={() => setIsShowing(false)}>Add new</a>
                        <Link className="modal-action success" to="/employee-list">View List</Link>
                    </>
                )}
            </Modal>

            <Box
                component="form"
                sx={{
                    width: "100%",
                    maxWidth: 600,
                  }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                {modalMessage && modalMessage.map((message) => (
                    <div key={message}>
                        <Alert severity="error">{message}</Alert>
                        <br />
                    </div>
                ))}
                <Stack spacing={3}>
                <TextField
                    fullWidth
                    required
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    fullWidth
                    required
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker
                            label="Date of Birth"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            inputFormat="DD/MM/YYYY"
                            value={dateOfBirth}
                            onChange={(newValue) => setDateOfBirth(newValue)}
                            renderInput={(params) => <TextField required {...params} />}
                        />
                        <DatePicker
                            label="Start Date"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            inputFormat="DD/MM/YYYY"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField required {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <Divider />
                <FormControl component="fieldset" variant="standard">
                    <FormLabel sx={{mb: 3}} component="legend">Address</FormLabel>
                    <FormGroup>
                        <Stack spacing={3}>
                            <TextField
                                id="street"
                                label="Street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <TextField
                                id="city"
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                id="state"
                                select
                                label="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                >
                                {states.map((option) => (
                                    <MenuItem key={option.abbreviation} value={option.abbreviation}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="zipCode"
                                label="Zip code"
                                type="number"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </Stack>
                    </FormGroup>
                </FormControl>
                <Divider />
                <TextField
                    fullWidth
                    id="department"
                    select
                    label="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    >
                    {departmentList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >Save</Button>
                </Stack>
            </Box>
        </>
    )
}
