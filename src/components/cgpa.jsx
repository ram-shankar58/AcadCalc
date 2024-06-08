import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadFull } from "tsparticles";

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

    const particlesInit = useCallback(async (engine) => {
        // console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        // await console.log(container);
    }, []);

    return(
        <Container>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
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
                        <Button variant="primary" onClick={handleAddInput}>
                            Add Subject
                        </Button>
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

export default CGPA;