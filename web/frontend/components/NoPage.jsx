import { useNavigate } from "@shopify/app-bridge-react";
import { Card, EmptyState, Page, Button } from "@shopify/polaris";

function NoPage() {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/pages/new");
  };
  return (
    <>
      <Page
        fullWidth
        title="Pages"
        secondaryActions={
          <Button primary onClick={handle}>
            Add page
          </Button>
        }
      >
        <Card sectioned>
          <EmptyState
            heading="Add pages to your online store"
            action={{
              content: "Add page",
              onAction: () => navigate("/pages/new"),
            }}
            image="https://cdn.shopify.com/shopifycloud/online-store-web/assets/8001a44e37248e13f435f27aac113bf41ef8c7b78c5a460e9c77137b887b37c0.svg"
          >
            <p>
              Write clear page titles and descriptions to improve your search
              engine optimization (SEO) and help customers find your website.
            </p>
          </EmptyState>
        </Card>
      </Page>
    </>
  );
}

export default NoPage;
