// page: Portfolio – resume-style profile using /portfolio/user/1
import { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import portfolioImg from "../assets/img/portfolio.jpg";

// function: formatDate
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

// function: formatDateRange
const formatDateRange = (start, end, isCurrent) => {
  const startFormatted = formatDate(start);
  if (isCurrent || !end) {
    return `${startFormatted} – Present`;
  }
  const endFormatted = formatDate(end);
  return `${startFormatted} – ${endFormatted}`;
};

// function: groupSkillsByCategory
const groupSkillsByCategory = (skills) => {
  const map = {};
  skills.forEach((skill) => {
    const category = skill.category || "Other";
    if (!map[category]) {
      map[category] = [];
    }
    map[category].push(skill);
  });
  return map;
};

function Portfolio() {
  const { callApi, loading, error } = useApi();
  const [profile, setProfile] = useState(null);

  // effect: fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await callApi("GET", "/portfolio/user/1");
        setProfile(res?.data || null);
      } catch {
        setProfile(null);
      }
    };

    fetchPortfolio();
  }, [callApi]);

  const experiences = useMemo(() => {
    if (!profile?.Experiences) return [];
    // sort by start_date desc
    return [...profile.Experiences].sort((a, b) => {
      const aTime = new Date(a.start_date).getTime();
      const bTime = new Date(b.start_date).getTime();
      return bTime - aTime;
    });
  }, [profile]);

  const projects = useMemo(() => {
    if (!profile?.Projects) return [];
    return [...profile.Projects].sort((a, b) => {
      const aTime = new Date(a.start_date).getTime();
      const bTime = new Date(b.start_date).getTime();
      return bTime - aTime;
    });
  }, [profile]);

  const educationList = useMemo(
    () => profile?.Education || [],
    [profile]
  );

  const skillsByCategory = useMemo(() => {
    if (!profile?.Skills) return {};
    return groupSkillsByCategory(profile.Skills);
  }, [profile]);

  const initials = useMemo(() => {
    if (!profile?.name) return "EJ";
    const parts = profile.name.split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[parts.length - 1]?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [profile]);

  return (
    <div className="py-4">
      {/* Loading / error state */}
      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span className="small text-muted">Loading portfolio...</span>
        </div>
      )}
      {error && (
        <div className="mb-3 text-danger small">
          Failed to load portfolio data. Please check the API.
        </div>
      )}

      {/* Guard: no profile */}
      {!profile && !loading && (
        <div className="text-muted small">
          No portfolio data available.
        </div>
      )}

      {profile && (
        <>
          {/* ===================== */}
          {/* Header / Summary card with background image */}
          {/* ===================== */}
          <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
            <Card.Body
              className="p-4 p-lg-5 text-white"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(59, 130, 246, 0.65)), url(${portfolioImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Row className="g-4 align-items-center">
                <Col md="auto">
                  {/* simple avatar using initials */}
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      fontWeight: 700,
                      border: "1px solid rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    {initials}
                  </div>
                </Col>
                <Col md>
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <Badge bg="light" text="dark" className="text-uppercase fw-semibold">
                      Portfolio
                    </Badge>
                    <Badge bg="primary" className="text-uppercase fw-semibold">
                      Full Stack
                    </Badge>
                    {profile.headline && (
                      <Badge bg="dark" className="text-uppercase fw-semibold">
                        {profile.headline}
                      </Badge>
                    )}
                  </div>
                  <h2 className="fw-semibold mb-2">{profile.name}</h2>
                  {profile.nickname && (
                    <div className="small text-light mb-1">
                      Also known as {profile.nickname}
                    </div>
                  )}
                  <div className="small text-light">
                    {profile.location && (
                      <>
                        {profile.location}
                        {" · "}
                      </>
                    )}
                    10+ years of experience in full stack engineering.
                  </div>
                </Col>
                <Col md="auto">
                  <div className="d-flex align-items-center gap-2 justify-content-md-end justify-content-start">
                    {profile.website_url && (
                      <Button
                        variant="light"
                        size="sm"
                        as="a"
                        href={profile.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark"
                      >
                        Website
                      </Button>
                    )}
                    {profile.github_url && (
                      <Button
                        variant="outline-light"
                        size="sm"
                        as="a"
                        href={profile.github_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </Button>
                    )}
                    {profile.linkedin_url && (
                      <Button
                        variant="outline-light"
                        size="sm"
                        as="a"
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>

              {profile.summary && (
                <Row className="mt-4">
                  <Col md={12}>
                    <div className="p-3 rounded-3 bg-light bg-opacity-75 text-dark">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Badge bg="dark">Summary</Badge>
                        <span className="small text-muted">Professional snapshot</span>
                      </div>
                      <div className="small mb-0">{profile.summary}</div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          <Row className="g-4">
            {/* ===================== */}
            {/* Experience + Education */}
            {/* ===================== */}
            <Col lg={8}>
              {/* Experience section */}
              <section className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Experience</h5>
                  <span className="small text-muted">
                    {experiences.length} roles
                  </span>
                </div>

                {experiences.length === 0 && (
                  <div className="small text-muted">
                    No experience records available.
                  </div>
                )}

                <ListGroup variant="flush">
                  {experiences.map((exp) => (
                    <ListGroup.Item
                      key={exp.id}
                      className="px-0 pb-3"
                    >
                      <Card className="border-0">
                        <Card.Body className="p-0">
                          <div className="d-flex justify-content-between flex-wrap gap-1">
                            <div>
                              <div className="fw-semibold">
                                {exp.title}
                              </div>
                              <div className="small text-muted">
                                {exp.company_name}
                                {exp.location && ` · ${exp.location}`}
                              </div>
                            </div>
                            <div className="text-end small text-muted">
                              {formatDateRange(
                                exp.start_date,
                                exp.end_date,
                                exp.is_current
                              )}
                              {exp.employment_type && (
                                <>
                                  <br />
                                  <span>{exp.employment_type}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {exp.description && (
                            <div
                              className="small text-muted mt-2"
                              // description is HTML from API
                              dangerouslySetInnerHTML={{
                                __html: exp.description,
                              }}
                            />
                          )}
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </section>

              {/* Education section */}
              <section>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Education</h5>
                  <span className="small text-muted">
                    {educationList.length} record
                    {educationList.length === 1 ? "" : "s"}
                  </span>
                </div>

                {educationList.length === 0 && (
                  <div className="small text-muted">
                    No education records available.
                  </div>
                )}

                <ListGroup variant="flush">
                  {educationList.map((edu) => (
                    <ListGroup.Item
                      key={edu.id}
                      className="px-0 pb-3"
                    >
                      <Card className="border-0">
                        <Card.Body className="p-0">
                          <div className="fw-semibold">
                            {edu.school_name}
                          </div>
                          <div className="small text-muted">
                            {edu.degree}
                            {edu.field_of_study &&
                              ` · ${edu.field_of_study}`}
                          </div>
                          <div className="small text-muted">
                            {formatDateRange(
                              edu.start_date,
                              edu.end_date,
                              false
                            )}
                            {edu.grade && ` · GPA ${edu.grade}`}
                          </div>
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </section>
            </Col>

            {/* ===================== */}
            {/* Projects + Skills */}
            {/* ===================== */}
            <Col lg={4}>
              {/* Projects */}
              <section className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Projects</h5>
                  <span className="small text-muted">
                    {projects.length} project
                    {projects.length === 1 ? "" : "s"}
                  </span>
                </div>

                {projects.length === 0 && (
                  <div className="small text-muted">
                    No project records available.
                  </div>
                )}

                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="border-0 shadow-sm mb-3"
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <Card.Title className="fs-6 mb-0">
                          {project.name}
                        </Card.Title>
                        <span className="small text-muted">
                          {formatDateRange(
                            project.start_date,
                            project.end_date,
                            !project.end_date
                          )}
                        </span>
                      </div>
                      {project.description && (
                        <Card.Text className="small text-muted mb-2">
                          {project.description}
                        </Card.Text>
                      )}
                      {project.tech_stack && (
                        <Card.Text className="small mb-2">
                          <strong>Tech stack: </strong>
                          <span className="text-muted">
                            {project.tech_stack}
                          </span>
                        </Card.Text>
                      )}
                      {project.link_url && (
                        <Button
                          as="a"
                          href={project.link_url}
                          target="_blank"
                          rel="noreferrer"
                          size="sm"
                          variant="outline-primary"
                        >
                          View project
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </section>

              {/* Skills */}
              <section>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Skills</h5>
                  <span className="small text-muted">
                    {profile.Skills?.length || 0} total
                  </span>
                </div>

                {Object.keys(skillsByCategory).length === 0 && (
                  <div className="small text-muted">
                    No skills listed.
                  </div>
                )}

                {Object.entries(skillsByCategory).map(
                  ([category, skills]) => (
                    <Card
                      key={category}
                      className="border-0 bg-light mb-2"
                    >
                      <Card.Body className="py-2">
                        <div className="small fw-semibold mb-1">
                          {category}
                        </div>
                        <div className="d-flex flex-wrap gap-1">
                          {skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              bg="secondary"
                              className="fw-normal"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  )
                )}
              </section>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default Portfolio;
