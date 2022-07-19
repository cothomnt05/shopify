import {
  Card,
  ChoiceList,
  Heading,
  TextContainer,
  Button,
} from "@shopify/polaris";
import { useCallback } from "react";
import { useState } from "react";

function Visibility() {
  const [selected, setSelected] = useState(["Visible"]);
  const handleChangeVisibility = useCallback((value) => {
    setSelected(value);
  }, []);

  return (
    <Card sectioned>
      <TextContainer>
        <Heading>Visibility </Heading>
        <ChoiceList
          choices={[
            {
              label: "Visible (as of 7/10/2022, 12:47 AM GMT+7)",
              value: "Visible",
            },
            { label: "Hidden", value: "Hidden" },
          ]}
          selected={selected}
          onChange={handleChangeVisibility}
        />
        <Button plain>Set visibility date</Button>
      </TextContainer>
    </Card>
  );
}

export default Visibility;
