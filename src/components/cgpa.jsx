import React, {useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootsrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToastContainer, toast } from "react-toastify";


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
        subject="",
        subjectcredit=4,
        subjectgrade="S",

    })

    return(
        <div style={{position: "relative", overflow: "hidden"}}>
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background:{
                    color:{
                        value:"#000",
                    },
                },
                fpsLimit: 60,
                particles: {
                    number:{
                        value: 100,
                        density: {
                            enable:true,
                            value_area: 800,
                        },
                    },
                    color:{
                        value: "#ffcc00",

                    },
                    shape:{
                        type: "circle",
                    },
                    opacity:{
                        value:0.5,
                        random:true,
                    },
                    size:{
                        value: 3,
                        random:{ enable:true, minimumValue: 1},

                    },
                    links:{
                        enable: false,
                    },
                    move:{
                        enable: true, 
                        speed: 2,
                    },
                    life:{
                        duration:{
                            sync: false,
                            value: 3,
                        },
                        count: 0,
                        delay:{
                            random:{
                                enable: true,
                                minimumValue: 0.5,
                            },
                            value:1,

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
                    <Col md= {{ span: 6, offset: 3}}>
                    <h1 className="text-center text-white mt-5">CGPA Calculator</h1>
                    <Form>
                        <Form.Group controlId="formCreditsCompleted" className="mt-3">
                            <Form.Label className="text-white">Total Credits completed</Form.Label>
                            <Form.Control type="text" placeholder = "Enter total credits completed so far" name="creditscompleted" onChange={handleChange} value={values.creditscompleted} />
                        
                        </Form.Group>
                        <Form.Group controlId="formCGPA" className="mt-3">
                            <Form.Label className="text-white">CGPA</Form.Label>
                            <Form.Control type="text" name="CGPA" placeholder="Enter the CGPA till now" onChange={handleChange} value={values.cgpa} />
                        </Form.Group>
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label className="text-white">Subject</Form.Label>
                            <Form.Control type="text" name="subject" placeholder="Enter the subject" onChange={handleChange} value={values.subject} />

                        </Form.Group>
                        <Form.Group controlId="formSubjectCredit" className="mt-3">
                            <Form.Label className="text-white">Subject Credit</Form.Label>
                            <Form.Control type="text" name="subjectcredit" placeholder="Enter the credits for the subject" onChange={handleChange} value={values.subjectcredit} />

                        </Form.Group>
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label className="text-white">Grade</Form.Label>
                            <Form.Control type="text" name="grade" placeholder="Enter the grade receieved for the subject" onChange={handleChange} value={values.subjectgrade} />

                        </Form.Group>

                    </Form>
                    <
                    </Col>
                </Row>
            </Container>
        </div>
    )
}