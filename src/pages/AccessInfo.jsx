// page: AccessInfo – RDP / SSH / FTP overview with images
import { Row, Col, Card, Badge } from "react-bootstrap";
import PageHero from "../components/PageHero";
import rdpImg from "../assets/img/rdp.jpg";
import sshImg from "../assets/img/ssh.jpg";
import ftpImg from "../assets/img/ftp.jpg";

function AccessInfo() {
  return (
    <div className="py-4">
      <PageHero
        backgroundImage={rdpImg}
        gradient="linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(99, 102, 241, 0.6))"
        badges={[
          { text: "Access", variant: "light", textColor: "dark" },
          { text: "Secure Channels", variant: "primary" },
        ]}
        title="Access Information"
        description="Review which remote access methods are active, see usage guidance, and confirm that credentials are always distributed through secure private channels."
      />

      <Row className="g-4">
        {/* RDP – currently not in use */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={rdpImg} alt="RDP access" />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">RDP</Card.Title>
                <Badge bg="secondary">Not in use</Badge>
              </div>
              <Card.Text className="small text-muted mb-2">
                Remote Desktop Protocol access for Windows environments.
              </Card.Text>
              <Card.Text className="small mb-0">
                This access method is currently{" "}
                <strong>disabled</strong> and not available for use.
                Any previous RDP endpoints should be treated as inactive.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* SSH */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={sshImg} alt="SSH access" />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">SSH</Card.Title>
                <Badge bg="primary">Active</Badge>
              </div>
              <Card.Text className="small text-muted mb-2">
                Secure shell access to Linux and server environments.
              </Card.Text>
              <Card.Text className="small mb-0">
                · Key-based authentication is recommended.
                <br />
                · Ideal for server management, deployment, and CLI tasks.
                <br />
                · Ports and user accounts are provisioned and controlled
                by CodeType.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* FTP / SFTP */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={ftpImg} alt="FTP / SFTP access" />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">FTP / SFTP</Card.Title>
                <Badge bg="primary">Active</Badge>
              </div>
              <Card.Text className="small text-muted mb-2">
                File transfer access for uploads and downloads.
              </Card.Text>
              <Card.Text className="small mb-0">
                · Prefer SFTP over plain FTP whenever possible.
                <br />
                · Intended for media, backups, and project file transfers.
                <br />
                · Accounts and permissions are granted on request.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 small text-muted">
        All access methods, accounts, and endpoints are fully managed by{" "}
        <strong>CodeType</strong>.  
        Actual hostnames, ports, and credentials are shared only through
        secure private channels.
      </div>
    </div>
  );
}

export default AccessInfo;
