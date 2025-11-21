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
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body
            className="p-4 p-lg-5 text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(146, 34, 250, 0.55)), url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <Badge bg="light" text="dark" className="text-uppercase fw-semibold">
                  CodeType
                </Badge>
                <Badge bg="success" className="text-uppercase fw-semibold">
                  Platform
                </Badge>
                <span className="small text-light">
                  Personal infrastructure · Media · Games · Tools
                </span>
              </div>

              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
                <div className="flex-grow-1">
                  <h1 className="display-6 fw-semibold mb-3">Welcome to CodeType Web</h1>
                  <p className="mb-4 text-light">
                    A unified platform for streaming, cocktail recipes, private game servers,
                    engineering projects, and access tools designed for quick, secure access.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Button as={Link} to="/streaming" variant="light" size="lg" className="text-dark">
                      Go to Streaming
                    </Button>
                    <Button
                      as={Link}
                      to="/codetype-bar"
                      variant="outline-light"
                      size="lg"
                      className="text-white"
                    >
                      Explore CodeType Bar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
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
            <Card className="h-100 gradient-card bg-gradient-peach text-dark">
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
                    variant="dark"
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
            <Card className="h-100 gradient-card bg-gradient-sky text-dark">
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
                    variant="dark"
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
            <Card className="h-100 gradient-card bg-gradient-mint text-dark">
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
                    variant="dark"
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
            <Card className="h-100 gradient-card bg-gradient-rose text-dark">
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
                    variant="dark"
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
            <Card className="h-100 gradient-card bg-gradient-gold text-dark">
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
                    variant="dark"
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
        <Card className="gradient-card bg-gradient-lilac text-dark">
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
