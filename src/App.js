import React, { useContext } from "react";
import { Alert, Container, Row, Col, Card, CardBody, CardHeader, Progress } from "reactstrap";
import { GlobalStateContext } from "./GlobalState";

function App() {
  const { state, handleSlider } = useContext(GlobalStateContext);

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <Card>
            <CardHeader>Messages {state.usersOnline} users Online.</CardHeader>
            <CardBody>
              <p>
                We have received {state.heartBeats} heartbeats from the server The server Heartbeat
                count is:{state.serverHB}
              </p>
              <Row>
                <Col>
                  <Alert color={state.currentAlert === 1 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 2 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 3 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Alert color={state.currentAlert === 4 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 5 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 6 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Alert color={state.currentAlert === 7 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 8 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
                <Col>
                  <Alert color={state.currentAlert === 9 ? "danger" : "primary"}>
                    Let's See how Syncronized this stays!
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Progress animated value={state.prog} />
                  {state.isProgMaster ? (
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={state.prog}
                      className="slider"
                      id="myRange"
                      onChange={handleSlider}
                    ></input>
                  ) : null}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
