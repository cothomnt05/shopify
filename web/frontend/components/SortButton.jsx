import { Button, Popover, ChoiceList, Icon } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { SortMinor } from "@shopify/polaris-icons";
import callAPI from "../../helpers/feature/callAPI";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

function SortButton() {
  const app = useAppBridge();
  const [pages, setPages] = useState(null);
  const [popoverActive, setPopoverActive] = useState(false);
  const [selected, setSelected] = useState(["hidden"]);

  const getPages = async () => {
    const pages = await callAPI.getPages(app);
    setPages(pages);
    console.log(pages);
  };
  useEffect(() => {
    getPages();
  }, []);

  const handleChange = useCallback((value) => {
    setSelected(value);
    console.log(value);
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

  return (
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
                { label: "Newest update", value: "Newest update" },
                { label: "Oldest update", value: "Oldest update" },
                { label: "Title A–Z", value: "Title A–Z" },
                { label: "Title Z–A", value: "Title Z–A" },
              ]}
              selected={selected}
              onChange={handleChange}
            />
          </Popover.Section>
        </div>
      </Popover>
    </div>
  );
}

export default SortButton;
