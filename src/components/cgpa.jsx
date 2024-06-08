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
        subject:"",
        subjectcredit:4,
        subjectgrade:"S",
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
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

        const {creditscompleted, cgpa, subject, subjectcredit, subjectgrade} = values;
        setLoading(true);

        calcgpa = cgpa;

        let v = cgpa * creditscompleted;
        v += gradetable[subjectgrade] * subjectcredit;
        calcgpa = v / (creditscompleted + subjectcredit);

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
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" name="subject" value={values.subject} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject Credit</Form.Label>
                            <Form.Control type="number" name="subjectcredit" value={values.subjectcredit} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject Grade</Form.Label>
                            <Form.Control type="text" name="subjectgrade" value={values.subjectgrade} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
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
