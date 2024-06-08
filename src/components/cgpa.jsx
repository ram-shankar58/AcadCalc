import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
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
        subject: "",
        subjectcredit: 4,
        subjectgrade: "S",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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
        const { creditscompleted, cgpa, subjectcredit, subjectgrade } = values;
        setLoading(true);

        let calcgpa = cgpa;
        let v = cgpa * creditscompleted;
        v += gradetable[subjectgrade] * subjectcredit;
        calcgpa = v / (creditscompleted + subjectcredit);

        document.getElementById("cgpafinal").innerHTML = `<h1 class="mt-5 text-center" style="color: green;">Your CGPA is ${calcgpa.toFixed(2)}</h1>`;
        setLoading(false);
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    value={values.cgpa}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSubject" className="mt-3">
                                <Form.Label className="text-white">Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    placeholder="Enter the subject"
                                    onChange={handleChange}
                                    value={values.subject}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSubjectCredit" className="mt-3">
                                <Form.Label className="text-white">Subject Credit</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter the credits for the subject"
                                    name="subjectcredit"
                                    onChange={handleChange}
                                    value={values.subjectcredit}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSubjectGrade" className="mt-3">
                                <Form.Label className="text-white">Subject Grade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subjectgrade"
                                    placeholder="Enter the grade received for the subject"
                                    onChange={handleChange}
                                    value={values.subjectgrade}
                                />
                            </Form.Group>
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
                                    Enter your till date credits completed, CGPA, along with the individual subject credits and grade
                                </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
            <div id="cgpafinal" className="mt-5 text-center" style={{ color: "green" }}></div>
        </div>
    );
};

export default CGPA;
