import { Card, TextContainer, Heading, Select } from "@shopify/polaris";
import { useCallback } from "react";
import { useState } from "react";

function OnlineStore() {
  const options = [
    { label: "Default page", value: "Default page" },
    { label: "cothomnt", value: "cothomnt" },
  ];

  const handleSelectChange = useCallback((value) => {
    setSelectedStore(value);
  }, []);

  const [selectedStore, setSelectedStore] = useState("");
  return (
    <Card sectioned>
      <TextContainer>
        <Heading>Online store</Heading>
        <Select
          label="Theme template"
          options={options}
          onChange={handleSelectChange}
          value={selectedStore}
        />
        <p>
          Assign a template from your current theme to define how the page is
          displayed.
        </p>
      </TextContainer>
    </Card>
  );
}

export default OnlineStore;
