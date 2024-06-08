import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CGPA = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const [values, setValues] = useState({
        creditscompleted: 160,
        cgpa: 9.00,
        subjects: [{name: "", credit: 4, grade: "S"}],
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...values.subjects];
        list[index][name] = value;
        setValues({...values, subjects: list});
    };

    const handleAddInput = () => {
        setValues({...values, subjects: [...values.subjects, {name: "", credit: 4, grade: "S"}]});
    };

    const gradetable = {
        "S":10,
        "A":9,
        "B":8,
        "C":7,
        "D":6
    };

    let calcgpa = 0;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const {creditscompleted, cgpa, subjects} = values;
        setLoading(true);

        calcgpa = cgpa;

        let v = cgpa * creditscompleted;
        subjects.forEach(subject => {
            v += gradetable[subject.grade] * subject.credit;
            calcgpa = v / (creditscompleted + subject.credit);
        });

        toast(`Your CGPA is ${calcgpa}`, toastOptions);
        setLoading(false);
    };

    return(
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Credits Completed</Form.Label>
                            <Form.Control type="number" name="creditscompleted" value={values.creditscompleted} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CGPA</Form.Label>
                            <Form.Control type="number" name="cgpa" value={values.cgpa} onChange={handleChange} />
                        </Form.Group>
                        {values.subjects.map((subject, i) => (
                            <div key={i}>
                                <Form.Group>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" name="name" value={subject.name} onChange={e => handleChange(e, i)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Subject Credit</Form.Label>
                                    <Form.Control type="number" name="credit" value={subject.credit} onChange={e => handleChange(e, i)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Subject Grade</Form.Label>
                                    <Form.Control type="text" name="grade" value={subject.grade} onChange={e => handleChange(e, i)} />
                                </Form.Group>
                            </div>
                        ))}
                        <Button variant="primary" onClick={handleAddInput} style="background-color: red; border: 2px solid red :hover{
                        background-color: regb(75,11,11);}">
                            Add Subject
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading} style="background-color: red; border: 2px solid red :hover{
                        background-color: regb(75,11,11);}">
                            Calculate
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

ReactDOM.render(<CGPA />, document.getElementById('root'));
