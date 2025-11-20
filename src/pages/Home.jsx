// page: Home – modern landing page with hero background image
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import bgImg from "../assets/img/bg.jpg";

function Home() {
  return (
    <div className="py-4">

      {/* ========================= */}
      {/* Hero Section with bg.jpg */}
      {/* ========================= */}
      <section className="mb-5">
        <Card className="border-0 shadow-sm text-white">
          <Card.Img src={bgImg} alt="CodeType background" />
          <Card.ImgOverlay className="d-flex flex-column justify-content-end">
            {/* Semi-transparent overlay box for readability */}
            <div className="bg-dark bg-opacity-50 rounded p-3 p-md-4 mb-2 d-inline-block">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="light" text="dark">CodeType</Badge>
                <span className="small text-light">
                  Personal infrastructure · Media · Games · Tools
                </span>
              </div>

              <h1 className="mb-2">Welcome to CodeType Web</h1>

              <p className="mb-3 text-light">
                A unified platform for streaming, cocktail recipes,
                private game servers, engineering projects, and access tools.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/streaming" variant="primary" size="lg">
                  Go to Streaming
                </Button>
                <Button
                  as={Link}
                  to="/codetype-bar"
                  variant="outline-light"
                  size="lg"
                >
                  Explore CodeType Bar
                </Button>
              </div>
            </div>
          </Card.ImgOverlay>
        </Card>
      </section>

      {/* ================================================= */}
      {/* Feature Section – Cards for Each Main Destination */}
      {/* ================================================= */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Navigate the space</h5>
          <span className="small text-muted">
            Explore key sections across CodeType Web.
          </span>
        </div>

        <Row className="g-3">
          {/* CodeType Bar */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>CodeType Bar</Card.Title>
                <Card.Text className="small text-muted mb-3">
                  A curated cocktail recipe library with modern filtering options.
                </Card.Text>
                <ul className="small text-muted mb-3">
                  <li>Base spirit filters</li>
                  <li>Detailed instructions & ingredients</li>
                  <li>Alcohol / non-alcohol options</li>
                </ul>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/codetype-bar"
                    variant="outline-primary"
                    size="sm"
                  >
                    View cocktail recipes
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Streaming */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Streaming / Plex</Card.Title>
                <Card.Text className="small text-muted mb-3">
                  Private media streaming with browser guidance and multi-device support.
                </Card.Text>
                <ul className="small text-muted mb-3">
                  <li>Link to video.codetypeweb.com</li>
                  <li>Access instructions</li>
                  <li>Large media library</li>
                </ul>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/streaming"
                    variant="outline-primary"
                    size="sm"
                  >
                    Open streaming info
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Game Servers */}
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Game Server</Card.Title>
                <Card.Text className="small text-muted mb-3">
                  Status overview for Minecraft, Palworld, Ark, RLcraft, and more.
                </Card.Text>
                <ul className="small text-muted mb-3">
                  <li>Open vs closed servers</li>
                  <li>Port & description details</li>
                  <li>Game artwork integration</li>
                </ul>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/game-server"
                    variant="outline-primary"
                    size="sm"
                  >
                    View game servers
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Portfolio */}
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Portfolio</Card.Title>
                <Card.Text className="small text-muted mb-3">
                  Engineering work, side projects, and technical creativity.
                </Card.Text>
                <ul className="small text-muted mb-3">
                  <li>Project highlights</li>
                  <li>Technical notes</li>
                  <li>Optional code/demo links</li>
                </ul>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/portfolio"
                    variant="outline-secondary"
                    size="sm"
                  >
                    Browse portfolio
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Access Info */}
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Access Info</Card.Title>
                <Card.Text className="small text-muted mb-3">
                  Overview of RDP, SSH, and FTP/SFTP access methods managed by CodeType.
                </Card.Text>
                <ul className="small text-muted mb-3">
                  <li>RDP status</li>
                  <li>SSH/SFTP usage guidelines</li>
                  <li>Security-focused structure</li>
                </ul>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/access-info"
                    variant="outline-secondary"
                    size="sm"
                  >
                    Open access overview
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Closing highlight section */}
      <section className="mt-4">
        <Card className="border-0 bg-light">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <Card.Title className="mb-1">
                One place for all things CodeType
              </Card.Title>
              <Card.Text className="small text-muted mb-0">
                From cocktails to game servers, this platform brings the entire
                CodeType ecosystem together.
              </Card.Text>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Badge bg="dark">Bar</Badge>
              <Badge bg="primary">Streaming</Badge>
              <Badge bg="success">Games</Badge>
              <Badge bg="secondary">Access</Badge>
              <Badge bg="info">Portfolio</Badge>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default Home;
