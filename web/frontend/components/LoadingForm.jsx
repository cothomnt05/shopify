import {
  Page,
  Loading,
  Layout,
  Card,
  SkeletonBodyText,
} from "@shopify/polaris";

function LoadingForm() {
  return (
    <Page
      fullWidth
      breadcrumbs={[{ content: "Home pages", url: "/" }]}
      title="Add page"
    >
      <Loading />
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={3} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={3} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={3} />
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default LoadingForm;
