import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading, useAppBridge } from "@shopify/app-bridge-react";
import { PageForm } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callAPI from "../../../helpers/feature/callAPI";
import LoadingPage from "./LoadingPage";

export default function PageEdit() {
  const app = useAppBridge();
  const { id } = useParams();
  const [page, setPage] = useState(null);

  const getPage = async () => {
    const data = await callAPI.getPage(app, id);
    setPage(data);
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <Page breadcrumbs={[{ content: "Home pages", url: "/" }]} title="Add page">
      {page === null ? <LoadingPage /> : <PageForm page={page} />}
    </Page>
  );
}
