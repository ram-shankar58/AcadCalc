import React, { useCallback, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
        subjects: [{ name: "", credit: 0, grade: "S" }],
    });

    const [loading, setLoading] = useState(false);
    const [finalCGPA, setFinalCGPA] = useState(null);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const subjects = [...values.subjects];
        subjects[index][name] = value;
        setValues({ ...values, subjects });
    };

    const gradetable = {
        S: 10,
        A: 9,
        B: 8,
        C: 7,
        D: 6,
    };

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { creditscompleted, cgpa, subjects } = values;
        setLoading(true);

        let totalCredits = creditscompleted;
        let totalGradePoints = cgpa * creditscompleted;

        subjects.forEach((subject) => {
            const { credit, grade } = subject;
            totalCredits += Number(credit);
            totalGradePoints += gradetable[grade] * Number(credit);
        });

        const calcgpa = totalGradePoints / totalCredits;
        setFinalCGPA(calcgpa);

        setLoading(false);
    };

    const addSubject = () => {
        setValues({
            ...values,
            subjects: [...values.subjects, { name: "", credit: 0, grade: "S" }],
        });
    };

    return (
        <div style={{ position: "relative", overflow: "hidden" }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#000",
                        },
                    },
                    fpsLimit: 60,
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: "#ffcc00",
                        },
                        shape: {
                            type: "circle",
                        },
                        opacity: {
                            value: 0.5,
                            random: true,
                        },
                        size: {
                            value: 3,
                            random: { enable: true, minimumValue: 1 },
                        },
                        links: {
                            enable: false,
                        },
                        move: {
                            enable: true,
                            speed: 2,
                        },
                        life: {
                            duration: {
                                sync: false,
                                value: 3,
                            },
                            count: 0,
                            delay: {
                                random: {
                                    enable: true,
                                    minimumValue: 0.5,
                                },
                                value: 1,
                            },
                        },
                    },
                    detectRetina: true,
                }}
                style={{
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <Container
                className="mt-5"
                style={{ position: "relative", zIndex: "2 !important" }}
            >
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center text-white mt-5">CGPA Calculator</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCreditsCompleted" className="mt-3">
                                <Form.Label className="text-white">Total Credits completed</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter total credits completed so far"
                                    name="creditscompleted"
                                    onChange={(e) => setValues({ ...values, creditscompleted: e.target.value })}
                                    value={values.creditscompleted}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCGPA" className="mt-3">
                                <Form.Label className="text-white">CGPA</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="cgpa"
                                    placeholder="Enter the CGPA till now"
                                    onChange={(e) => setValues({ ...values, cgpa: e.target.value })}
                                    value={values.cgpa}
                                />
                            </Form.Group>
                            {values.subjects.map((subject, index) => (
                                <div key={index}>
                                    <Form.Group controlId={`formSubject${index}`} className="mt-3">
                                        <Form.Label className="text-white">Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Enter the subject"
                                            onChange={(e) => handleChange(e, index)}
                                            value={subject.name}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`formSubjectCredit${index}`} className="mt-3">
                                        <Form.Label className="text-white">Subject Credit</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter the credits for the subject"
                                            name="credit"
                                            onChange={(e) => handleChange(e, index)}
                                            value={subject.credit}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`formSubjectGrade${index}`} className="mt-3">
                                        <Form.Label className="text-white">Subject Grade</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="grade"
                                            placeholder="Enter the grade received for the subject"
                                            onChange={(e) => handleChange(e, index)}
                                            value={subject.grade}
                                        />
                                    </Form.Group>
                                </div>
                            ))}
                            <Button className="mt-3" onClick={addSubject}>Add Subject</Button>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                }}
                                className="mt-4"
                            >
                                <Button
                                    type="submit"
                                    className="text-center mt-3 btnStyle"
                                    disabled={loading}
                                >
                                    {loading ? "Calculating..." : "Enter Details"}
                                </Button>
                                <p className="mt-3" style={{ color: "#9d9494" }}>
                                    Enter your till date credits completed, CGPA, along with the individual subject
                                </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <div className="mt-5 text-center" style={{ color: "green" }}>
                    
                    <h1>Your CGPA is {finalCGPA}</h1>
                </div>

                <ToastContainer />
            </Container>
            
        </div>
    );
};

export default CGPA;
