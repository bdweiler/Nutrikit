import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Headings extends Component {
    // Displays the headings for the page
    render() {
        return (
            <Container className="text-center my-5">
                <Row>
                    <Col>
                        <h1>NutriKit Food Planner</h1>
                        <h3>
                            NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)
                        </h3>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Headings;
