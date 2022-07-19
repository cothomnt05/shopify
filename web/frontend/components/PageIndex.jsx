import {
  Card,
  Filters,
  ChoiceList,
  Button,
  Icon,
  ResourceList,
  ResourceItem,
  TextStyle,
  Modal,
  TextContainer,
  Frame,
  Toast,
  EmptyState,
  Layout,
  Page,
  Popover,
  Pagination,
  Stack,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { FavoriteMajor, SortMinor } from "@shopify/polaris-icons";
import { useEffect } from "react";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import callAPI from "../../helpers/feature/callAPI";
import LoadingHomePage from "./LoadingHomePage";
import NoPage from "./NoPage";
import TabAll from "./TabAll";

export function PageIndex() {
  const app = useAppBridge();
  const navigate = useNavigate();
  const [pages, setPages] = useState(null);
  const [change, setChange] = useState(false);
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), []);
  const [activeDelete, setActiveDelete] = useState(false);

  const handle = () => {
    navigate("/pages/new");
  };

  const [queryValue, setQueryValue] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const handleVisibilityChange = useCallback(
    (value) => setVisibility(value),
    []
  );
  const handleFiltersQueryChange = useCallback((value) => {
    setQueryValue(value);
  }, []);

  const [popoverActive, setPopoverActive] = useState(false);
  const [selected, setSelected] = useState(["hidden"]);
  const getPages = async () => {
    const allPages = await callAPI.getPages(app);
    setPages(allPages);
  };

  useEffect(() => {
    getPages();
  }, [change]);

  const handleChangeSort = useCallback(async (value) => {
    setSelected(value);
    let pageSorted = await callAPI.getPages(app);
    console.log(pageSorted);
    switch (value[0]) {
      case "Newest update":
        pageSorted.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setPages(pageSorted);
        setN(5);
        break;
      case "Oldest update":
        pageSorted.sort(
          (a, b) =>
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
        setPages(pageSorted);
        setN(5);
        break;
      case "Title A–Z":
        pageSorted.sort((a, b) => a.title.localeCompare(b.title));
        setPages(pageSorted);
        setN(5);
        break;
      case "Title Z–A":
        pageSorted.sort((a, b) => b.title.localeCompare(a.title));
        setPages(pageSorted);
        setN(5);
        break;
    }
  }, []);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon source={SortMinor} color="base" />
        <span> Sort</span>
      </div>
    </Button>
  );
  const handleVisibilityRemove = useCallback(() => setVisibility(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleVisibilityRemove();
    handleQueryValueRemove();
  }, [handleVisibilityRemove, handleQueryValueRemove]);

  const filters = [
    {
      key: "visibility",
      label: "Visibility",
      filter: (
        <ChoiceList
          title="Visibility"
          titleHidden
          choices={[
            { label: "Visibility", value: "Visibility" },
            { label: "Hidden", value: "Hidden" },
          ]}
          selected={visibility || []}
          onChange={handleVisibilityChange}
        />
      ),
      shortcut: true,
    },
  ];
  const appliedFilters = [];
  if (!isEmpty(visibility)) {
    const key = "visibility";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, visibility),
      onRemove: handleVisibilityRemove,
    });
  }
  //begin page list
  const [selectedPages, setSelectedPages] = useState([]);

  const resourceName = {
    singular: "Page",
    plural: "Pages",
  };

  const deletePage = async () => {
    const data = await callAPI.deleteMany(app, selectedPages);
    console.log("Delete data", data);
    setActive(!active);
    setSelectedPages([]);
    setChange(!change);
    setActiveDelete(true);
  };
  const modalDelete = (
    <Modal
      open={active}
      onClose={handleChange}
      title={`Delete ${selectedPages.length} ${
        selectedPages.length == 1 ? "page" : "pages"
      }`}
      primaryAction={{
        content: `Delete ${selectedPages.length} ${
          selectedPages.length == 1 ? "page" : "pages"
        }`,
        onAction: deletePage,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            Deleted pages cannot be recovered. Do you still want to continue?
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Hide selected pages",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete pages",
      destructive: true,
      onAction: () => setActive(!active),
    },
  ];

  const toastMarkup = activeDelete ? (
    <Toast
      duration={1000}
      content="Page deleted successfully"
      onDismiss={() => {
        setActiveDelete(false);
      }}
    />
  ) : null;

  const noPageSearch = (
    <EmptyState
      heading="No Pages found"
      image="data:image/svg+xml,%3csvg width='60' height='60' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41.87 24a17.87 17.87 0 11-35.74 0 17.87 17.87 0 0135.74 0zm-3.15 18.96a24 24 0 114.24-4.24L59.04 54.8a3 3 0 11-4.24 4.24L38.72 42.96z' fill='%238C9196'/%3e%3c/svg%3e"
    >
      <p>Try changing the filters or search term</p>
    </EmptyState>
  );
  const [n, setN] = useState(5);

  const paginationPage = (start, end) => {
    const newPageArr = pages.slice(start, end);
    return newPageArr;
  };

  return (
    <Frame>
      {pages === null ? (
        <LoadingHomePage />
      ) : pages.length === 0 ? (
        <NoPage />
      ) : (
        <Page
          fullWidth
          title="Pages"
          secondaryActions={
            <Button primary onClick={handle}>
              Add page
            </Button>
          }
        >
          <Layout>
            <Layout.Section>
              <Card>
                {modalDelete}
                <TabAll />
                <Card.Section>
                  <Filters
                    queryValue={queryValue || ""}
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleFiltersClearAll}
                  >
                    <div
                      style={{ paddingLeft: "8px", display: "inline-block" }}
                    >
                      <Button disabled>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Icon source={FavoriteMajor} color="base" />
                          <span> Saved</span>
                        </div>
                      </Button>
                    </div>
                    <div
                      style={{
                        paddingLeft: "8px",
                        display: "inline-block",
                      }}
                    >
                      <div>
                        <Popover
                          active={popoverActive}
                          activator={activator}
                          autofocusTarget="first-node"
                          onClose={togglePopoverActive}
                          sectioned
                        >
                          <div style={{ right: "80px" }}>
                            <Popover.Section>
                              <ChoiceList
                                title="Sort by"
                                choices={[
                                  {
                                    label: "Newest update",
                                    value: "Newest update",
                                  },
                                  {
                                    label: "Oldest update",
                                    value: "Oldest update",
                                  },
                                  { label: "Title A–Z", value: "Title A–Z" },
                                  { label: "Title Z–A", value: "Title Z–A" },
                                ]}
                                selected={selected}
                                onChange={handleChangeSort}
                              />
                            </Popover.Section>
                          </div>
                        </Popover>
                      </div>
                    </div>
                  </Filters>
                </Card.Section>

                <ResourceList
                  resourceName={resourceName}
                  items={
                    !queryValue
                      ? paginationPage(n - 5, n)
                      : pages.filter(
                          (page) =>
                            page.title.includes(queryValue) ||
                            page.body_html.includes(queryValue)
                        )
                  }
                  emptyState={noPageSearch}
                  renderItem={renderPage}
                  selectedItems={selectedPages}
                  onSelectionChange={setSelectedPages}
                  bulkActions={bulkActions}
                />
                {pages.length > 5 ? (
                  <div
                    style={{
                      borderTop: ".0625rem solid var(--p-border-subdued)",
                      padding: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    <Stack alignment="center" distribution="center">
                      <Pagination
                        hasPrevious={n <= 5 ? false : true}
                        onPrevious={() => {
                          setN((n) => n - 5);
                          console.log("Previous", paginationPage(n - 5, n));
                        }}
                        hasNext={n >= pages.length ? false : true}
                        onNext={() => {
                          setN((n) => n + 5);
                          console.log("Next", paginationPage(n - 5, n));
                        }}
                      />
                    </Stack>
                  </div>
                ) : null}
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      )}

      {toastMarkup}
    </Frame>
  );
  function disambiguateLabel(key, value) {
    switch (key) {
      case "visibility":
        return value.map(
          (val) =>
            `Visibility is ${val === "Visibility" ? "Visible" : "Hidden"}`
        );
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
  function renderPage(page, _, index) {
    const { id, title, body_html, created_at } = page;

    return (
      <ResourceItem
        id={id}
        url={`/pages/${id}`}
        title={title}
        body_html={body_html}
        created_at={created_at}
        accessibilityLabel={`View details for ${title}`}
      >
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>
          <TextStyle variation="subdued">
            {body_html.replace(/<[^>]+>/g, "")}
          </TextStyle>
        </div>
        <div>
          <TextStyle variation="subdued">
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </TextStyle>
        </div>
      </ResourceItem>
    );
  }
}
