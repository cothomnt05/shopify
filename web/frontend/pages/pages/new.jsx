import { Page } from "@shopify/polaris";
import { PageForm } from "../../components";

export default function ManageCode() {
  return (
    <Page breadcrumbs={[{ content: "Home pages", url: "/" }]} title="Add page">
      <PageForm />
    </Page>
  );
}
