import {
  PageActions,
  TextField,
  Card,
  Layout,
  TextContainer,
  Frame,
  ContextualSaveBar,
  AppProvider,
  Modal,
  Toast,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import Visibility from "./Visibility";
import OnlineStore from "./OnlineStore";
import callAPI from "../../helpers/feature/callAPI";
import LoadingForm from "./LoadingForm";

export function PageForm(props) {
  const { page } = props;
  const app = useAppBridge();
  const navigate = useNavigate();
  const [title, setTitle] = useState(!page ? "" : page.title);
  const [body_html, setBody_html] = useState(!page ? "" : page.body_html);
  const [isDirty, setIsDirty] = useState(false);
  const isLoading = false;
  const [active, setActive] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false);

  const [activeSave, setActiveSave] = useState(false);

  const handleDiscard = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleDiscardFail = useCallback(() => {
    navigate("/");
  }, []);
  const handleDiscardChanges = useCallback(() => {
    setActive(!active);
    setTitle(!page ? "" : page.title);
    setBody_html(!page ? "" : page.body_html);
  }, [active]);
  //function

  const handleChangeTitle = useCallback((newValue) => {
    setTitle(newValue);
    setIsDirty(true);
  }, []);

  const handleSave = async () => {
    const data = {
      title: title,
      body_html: body_html,
    };

    await callAPI.post(app, data);
    setTimeout(() => {
      navigate("/");
    }, 800);
    setIsDirty(false);
    setActiveSave((activeSave) => !activeSave);
  };

  const handleUpdate = async () => {
    const data = {
      title: title,
      body_html: body_html,
    };
    const res = await callAPI.update(app, data, page.id);

    setTimeout(() => {
      navigate("/");
    }, 800);
    console.log("Result: ", res);
    setIsDirty(false);
    setActiveSave((activeSave) => !activeSave);
  };

  const deletePage = async () => {
    const res = await callAPI.deleteOne(app, page.id);
    console.log(res);

    setIsDirty(false);
    setActiveDelete((activeDelete) => !activeDelete);
    setCancel(!cancel);
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const toastMarkup = activeSave ? (
    !page ? (
      <Toast content="Page was created" onDismiss={handleSave} />
    ) : (
      <Toast content="Page was saved" onDismiss={handleUpdate} />
    )
  ) : null;

  const toastDelete = activeDelete ? (
    <Toast content="Page was deleted" onDismiss={deletePage} />
  ) : null;

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: !page ? handleSave : handleUpdate,
        disabled: !page
          ? !title && !body_html
          : title == page.title && body_html == page.body_html,
      }}
      discardAction={{
        onAction: !page
          ? !title && !body_html
            ? handleDiscardFail
            : handleDiscard
          : title == page.title && body_html == page.body_html
          ? handleDiscardFail
          : handleDiscard,
      }}
    />
  ) : null;

  const logo = {
    width: 124,
    contextualSaveBarSource:
      "https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg",

    accessibilityLabel: "Shopify",
  };

  const actualPageMarkup = (
    <>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Title"
              value={title}
              onChange={handleChangeTitle}
              placeholder="e.g. Contact us, Sizing chart, FAQs"
              autoComplete="off"
            />
            <TextContainer spacing="tight">
              <br />
              <p>Content</p>
              <CKEditor
                editor={Editor}
                data={body_html}
                onReady={(editor) => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      "height",
                      "150px",
                      editor.editing.view.document.getRoot()
                    );
                  });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setBody_html(data);
                  setIsDirty(true);
                }}
              />
            </TextContainer>
          </Card>
          <Card
            sectioned
            title="Search engine listing preview"
            actions={[{ content: "Edit website SEO" }]}
          >
            {title && body_html ? (
              <>
                <p style={{ color: "#1a0dab", fontSize: "1.125rem" }}>
                  {title}
                </p>
                <p style={{ color: "#006621", fontSize: ".8125rem" }}>
                  https://cothomnt.myshopify.com/pages/
                  {!page ? title : page.handle}
                </p>
                <p style={{ color: "#545454", fontSize: ".8125rem" }}>
                  {body_html.replace(/<[^>]+>/g, "")}
                </p>
              </>
            ) : title && !body_html ? (
              <p>
                Add a description to see how this Page might appear in a search
                engine listing
              </p>
            ) : body_html && !title ? (
              <p>
                Add a title to see how this Page might appear in a search engine
                listing
              </p>
            ) : (
              <p>
                Add a title and description to see how this Page might appear in
                a search engine listing
              </p>
            )}
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Visibility />
          <OnlineStore />
        </Layout.Section>
      </Layout>
      <br></br>
    </>
  );

  const pageMarkup = isLoading ? <LoadingForm /> : actualPageMarkup;

  const footer = (
    <PageActions
      primaryAction={{
        content: "Save",
        disabled: !page
          ? !title && !body_html
          : title == page.title && body_html == page.body_html,
        onAction: !page ? handleSave : handleUpdate,
      }}
      secondaryActions={[
        {
          content: !page ? "Cancel" : "Delete page",
          onAction: () => {
            setCancel(!cancel);
          },
          destructive: !page ? false : true,
          outline: !page ? false : true,
        },
      ]}
    />
  );

  const modalDiscard = (
    <div>
      <Modal
        open={active}
        onClose={handleDiscard}
        title="Discard all unsaved changes"
        primaryAction={{
          content: "Discard changes",
          onAction: handleDiscardChanges,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: "Continue editing",
            onAction: handleDiscard,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              If you discard changes, you’ll delete any edits you made since you
              last saved.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );

  const handleCancel = () => {
    setCancel(!cancel);
  };

  const modalCancel = !page ? (
    <div>
      <Modal
        open={cancel}
        onClose={handleCancel}
        title="You have unsaved changes"
        secondaryActions={{
          content: "Cancel",
          onAction: handleCancel,
        }}
        primaryAction={[
          {
            content: "Leave page",
            onAction: () => {
              setCancel(!cancel);
              navigate("/");
            },
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>If you leave this page, all unsaved changes will be lost.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  ) : (
    <div>
      <Modal
        open={cancel}
        onClose={handleCancel}
        title={`Delete ${page.title}`}
        secondaryActions={{
          content: "Cancel",
          onAction: handleCancel,
        }}
        primaryAction={[
          {
            content: "Delete",
            onAction: deletePage,
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>Delete “{page.title}”? This can't be undone.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );

  return (
    <div>
      {modalDiscard}
      {modalCancel}
      <AppProvider
        i18n={{
          Polaris: {
            ContextualSaveBar: {
              save: "Save",
              discard: "Discard",
            },
          },
        }}
      >
        <Frame logo={logo}>
          {contextualSaveBarMarkup}
          {pageMarkup}
          {footer}
          {toastMarkup}
          {toastDelete}
        </Frame>
      </AppProvider>
    </div>
  );
}
