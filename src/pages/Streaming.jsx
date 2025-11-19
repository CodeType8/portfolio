// page: Streaming – modern Plex landing
import { Card, Button, Row, Col, Alert, Badge } from "react-bootstrap";
import plexImg from "../assets/img/plex.jpg";

function Streaming() {
  const handleOpenPlex = () => {
    window.open(
      "https://video.codetypeweb.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="py-4">
      {/* Hero card with image */}
      <Card className="border-0 shadow-sm mb-4 text-white">
        <Card.Img src={plexImg} alt="Plex streaming" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
          <div className="bg-dark bg-opacity-50 rounded p-3 p-md-4 d-inline-block">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="warning" text="dark">
                Plex
              </Badge>
              <span className="small text-light">
                Personal media streaming by CodeType
              </span>
            </div>
            <h2 className="mb-2">Streaming / Plex</h2>
            <p className="mb-3 mb-md-4">
              Access your curated library of movies, shows, and more through a
              private Plex server, available across your devices.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenPlex}
            >
              Go to CodeType Plex
            </Button>
            <div className="small text-light mt-2">
              Opens{" "}
              <strong>video.codetypeweb.com</strong> in a new tab.
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>

      {/* Detail sections */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-2">
                How it works
              </Card.Title>
              <Card.Text className="text-muted small mb-3">
                Plex acts as a personal media hub, letting you stream your
                content wherever you are.
              </Card.Text>

              <ul className="small mb-0">
                <li>
                  Access is limited to users with a registered account and
                  granted permissions.
                </li>
                <li>
                  Compatible with web browsers, mobile apps, smart TVs, and
                  streaming devices.
                </li>
                <li>
                  Transcoding and bandwidth are managed server-side for a
                  smooth experience.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3 fs-6">
                If you see &quot;Your connection is not private&quot;
              </Card.Title>

              <Alert variant="warning" className="small">
                Some browsers may show a certificate warning when connecting.
                Proceed only from networks and devices you trust.
              </Alert>

              <ol className="small mb-0">
                <li className="mb-1">
                  On the warning page, click <code>Advanced</code>.
                </li>
                <li className="mb-1">
                  Click{" "}
                  <code>Proceed to codetypeweb.com (unsafe)</code>.
                </li>
                <li className="mb-1">
                  If you are using Edge or Safari, refresh the page once
                  after proceeding.
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 small text-muted">
        All access permissions, accounts, and endpoints for the Plex server
        are managed by <strong>CodeType</strong>.  
        Account details are shared only through secure private channels.
      </div>
    </div>
  );
}

export default Streaming;
