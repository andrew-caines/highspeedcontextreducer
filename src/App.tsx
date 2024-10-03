import { useContext } from "react";
//import { Alert, Container, Row, Col, Card, CardBody, CardHeader, Progress } from "reactstrap";
import { Alert, Container, SimpleGrid, Card, Progress } from "@mantine/core";
import { GlobalStateContext } from "./Globalstate";

function App() {
  const context = useContext(GlobalStateContext);

  const alerts = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((alert, idx) => <Alert key={idx} color={context?.state.currentAlert === alert ? "red" : "blue"} >Let's See how Syncronized this stays!</Alert>);
  return (
    <Container fluid>

      <Card>
        <Card.Section>Messages {context?.state.usersOnline} users Online.</Card.Section>
        <p>
          We have received {context?.state.heartBeats} heartbeats from the server The server Heartbeat
          count is:{context?.state.serverHB}
        </p>
        <SimpleGrid cols={3}>
          {alerts}
          {context?.state.isProgMaster ? (
            <input
              type="range"
              min="1"
              max="100"
              value={context?.state.prog}
              className="slider"
              id="myRange"
              onChange={e => context?.handleSlider(+e.currentTarget.value)}
            ></input>
          ) : null}

        </SimpleGrid>
        {
          !context?.state.isProgMaster && <Progress animated value={context?.state?.prog !== undefined ? context.state.prog : 0} />
        }

      </Card>
    </Container >
  );
}

export default App;
//