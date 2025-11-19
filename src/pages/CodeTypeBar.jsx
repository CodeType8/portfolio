// page: CodeTypeBar – cocktail recipe list
import { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useApi } from "../hooks/useApi";

// helper: getAlcoholBadgeVariant
const getAlcoholBadgeVariant = (isAlcoholic) => {
  if (isAlcoholic === true) return "danger";
  if (isAlcoholic === false) return "success";
  return "secondary";
};

// helper: formatAbv
const formatAbv = (abv) => {
  if (!abv && abv !== 0) return "N/A";
  return `${abv}% ABV`;
};

function CodeTypeBar() {
  const { callApi, loading, error } = useApi();

  const [bases, setBases] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  const [selectedBaseId, setSelectedBaseId] = useState("");
  const [alcoholFilter, setAlcoholFilter] = useState("all"); // all | alcoholic | non-alcohol
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // fetch bases on mount
  useEffect(() => {
    const fetchBases = async () => {
      try {
        const res = await callApi("GET", "/bases");
        const items = res?.data?.items || [];
        setBases(items);
      } catch {
        // in case of error, keep bases empty – UI still works
      }
    };

    fetchBases();
  }, [callApi]);

  // fetch recipes whenever filters/page change
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const query = {
          page,
          pageSize,
        };

        if (selectedBaseId) {
          query.baseId = selectedBaseId;
        }

        if (search) {
          query.search = search;
        }

        if (alcoholFilter === "alcoholic") {
          query.isAlcoholic = "true";
        } else if (alcoholFilter === "non-alcohol") {
          query.isAlcoholic = "false";
        }

        const res = await callApi("GET", "/bar/recipes/", { query });
        const items = res?.data?.items || [];
        const paginationInfo = res?.data?.pagination || null;

        setRecipes(items);
        setPagination(paginationInfo || null);
      } catch {
        setRecipes([]);
        setPagination(null);
      }
    };

    fetchRecipes();
  }, [callApi, page, pageSize, selectedBaseId, search, alcoholFilter]);

  const handleBaseChange = (event) => {
    setSelectedBaseId(event.target.value);
    setPage(1);
  };

  const handleAlcoholFilterChange = (event) => {
    setAlcoholFilter(event.target.value);
    setPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedBaseId("");
    setAlcoholFilter("all");
    setSearch("");
    setSearchInput("");
    setPage(1);
  };

  const hasNextPage = useMemo(
    () => pagination?.hasNextPage === true,
    [pagination]
  );
  const hasPreviousPage = useMemo(
    () => pagination?.hasPreviousPage === true,
    [pagination]
  );

  return (
    <div className="py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <div>
          <h2 className="mb-1">CodeType Bar</h2>
          <p className="text-muted mb-0">
            Curated cocktail recipes served at CodeType Bar.
          </p>
        </div>
        <Badge bg="dark" pill>
          Cocktail Recipes
        </Badge>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSearchSubmit}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Label>Base spirit</Form.Label>
                <Form.Select
                  value={selectedBaseId}
                  onChange={handleBaseChange}
                >
                  <option value="">All bases</option>
                  {bases.map((base) => (
                    <option key={base.id} value={base.id}>
                      {base.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label>Alcohol filter</Form.Label>
                <Form.Select
                  value={alcoholFilter}
                  onChange={handleAlcoholFilterChange}
                >
                  <option value="all">All drinks</option>
                  <option value="alcoholic">Alcoholic only</option>
                  <option value="non-alcohol">Non-alcohol only</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or description"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="small text-muted">
                {pagination ? (
                  <>
                    Page <strong>{pagination.page}</strong> of{" "}
                    <strong>{pagination.totalPages}</strong> ·{" "}
                    <strong>{pagination.totalItems}</strong> recipes total
                  </>
                ) : (
                  "Recipe list"
                )}
              </div>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={handleClearFilters}
              >
                Clear filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Loading / Error */}
      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span className="small text-muted">Loading recipes...</span>
        </div>
      )}

      {error && (
        <div className="text-danger small mb-3">
          Failed to load recipes. Check the API or try again.
        </div>
      )}

      {/* Recipe grid */}
      <Row className="g-3">
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <Card.Title className="mb-1">
                      {recipe.name}
                    </Card.Title>
                    <div className="small text-muted">
                      {recipe.Base?.name || "Unknown base"}
                    </div>
                  </div>
                  <Badge bg={getAlcoholBadgeVariant(recipe.is_alcoholic)}>
                    {recipe.is_alcoholic ? "Alcoholic" : "Non-alcohol"}
                  </Badge>
                </div>

                {recipe.description && (
                  <Card.Text className="small text-muted mb-2">
                    {recipe.description}
                  </Card.Text>
                )}

                <div className="small mb-2">
                  <div>
                    <strong>ABV:</strong> {formatAbv(recipe.abv)}
                  </div>
                  {recipe.glass_type && (
                    <div>
                      <strong>Glass:</strong> {recipe.glass_type}
                    </div>
                  )}
                  {recipe.garnish && (
                    <div>
                      <strong>Garnish:</strong> {recipe.garnish}
                    </div>
                  )}
                </div>

                {recipe.ingredients && (
                  <div className="small mb-2">
                    <strong>Ingredients:</strong>
                    <br />
                    <span className="text-muted">
                      {recipe.ingredients}
                    </span>
                  </div>
                )}

                {recipe.instructions && (
                  <div className="small mb-3">
                    <strong>Instructions:</strong>
                    <br />
                    <span className="text-muted">
                      {recipe.instructions}
                    </span>
                  </div>
                )}

                <div className="mt-auto small text-muted">
                  ID: {recipe.id}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {!loading && recipes.length === 0 && (
          <Col>
            <div className="text-muted small">
              No recipes found with the current filters.
            </div>
          </Col>
        )}
      </Row>

      {/* Pagination controls */}
      {pagination && (hasPreviousPage || hasNextPage) && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={!hasPreviousPage || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="small text-muted">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={!hasNextPage || loading}
            onClick={() =>
              setPage((prev) =>
                pagination.totalPages
                  ? Math.min(prev + 1, pagination.totalPages)
                  : prev + 1
              )
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default CodeTypeBar;
