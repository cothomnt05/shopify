import {
  Frame,
  Loading,
  SkeletonPage,
  SkeletonTabs,
  Card,
  EmptyState,
  Spinner,
} from "@shopify/polaris";

function LoadingHomePage() {
  return (
    <Frame>
      <Loading />
      <SkeletonPage fullWidth>
        <Card>
          <SkeletonTabs />
          <div style={{ display: "flex", margin: "10px" }}>
            <div
              style={{
                width: "30%",
                border: "solid 1px #ccc",
                borderRadius: "5px",
                height: "36px",
                marginRight: "5px",
                backgroundColor: "#f2f7fe",
              }}
            ></div>
            <div
              style={{
                width: "70%",
                border: "solid 1px #ccc",
                borderRadius: "5px",
                height: "36px",
                backgroundColor: "#f2f7fe",
              }}
            ></div>
          </div>
          <EmptyState>
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </EmptyState>
        </Card>
      </SkeletonPage>
    </Frame>
  );
}

export default LoadingHomePage;
