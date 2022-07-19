import {
  Card,
  Frame,
  Layout,
  Loading,
  SkeletonBodyText,
} from "@shopify/polaris";

function LoadingPage() {
  return (
    <Frame>
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
    </Frame>
  );
}

export default LoadingPage;
