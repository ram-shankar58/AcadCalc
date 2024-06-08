import React, {useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/clients";
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
        subject:"",
        subjectcredit:4,
        subjectgrade:"S",

    })

    const [loading, setLoading] = useState(false);

    const handleChange=(e) ={
        setValues({...values, [e.target.name]: e.target.value});
    };

    const gradetable{
        "S":10,
        "A":9,
        "B":8,
        "C":7,
        "D":6



    };

    var calcgpa=0;

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const {creditscompleted, cgpa, subject, subjectcredit, subjectgrade}=values;
        setLoading(true);

   

        calcgpa=cgpa;

        let v=cgpa*creditscompleted;
        v+=gradetable[subjectgrade]*subjectcredit;
        calcgpa=v/(creditscompleted+subjectcredit);

        let head=document.getElementById("cgpafinal");
        head.appendChild(<h1 className="mt-5 text-center color: green">Your CGPA is {calcgpa} </h1>)


    };

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
                        <Form.Group controlId="formSubjectGrade" className="mt-3">
                            <Form.Label className="text-white">Subject Grade</Form.Label>
                            <Form.Control type="text" name="grade" placeholder="Enter the grade receieved for the subject" onChange={handleChange} value={values.subjectgrade} />

                        </Form.Group>
                        <div style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}
                        className="mt-4">
                            <Button type="submit" className="text-center mt-3 btnStyle" onClick={!loading?handleSubmit : null}
                            disabled = {loading} >
                                {loading ? "Calculating...": "Enter Details"}
                            </Button>
                            <p className="mt-3" style = {{color: "#9d9494"}}>
                                Enter your till date credits completed, CGPA, along with the individual subject credits and grade
                            </p>
                        </div>

                    </Form>
    
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
            <div id="cgpafinal" className="mt-5 text-center color:green">
            </div>
        </div>
        
    );
};

export default CGPA;