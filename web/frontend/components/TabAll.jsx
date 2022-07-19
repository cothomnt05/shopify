import { Tabs } from "@shopify/polaris";
import { useCallback } from "react";
import { useState } from "react";

function TabAll() {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: "all-pages",
      content: "All",
      accessibilityLabel: "All pages",
      panelID: "all-pages",
    },
  ];

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
  );
}

export default TabAll;
