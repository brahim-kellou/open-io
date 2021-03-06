import * as React from 'react';
import { Flex, Input, Button, Box, Text } from "@chakra-ui/react";
import '../styles.css';

interface MenuProps {
  countPerson?: number,
  onMaxChanged: (objects: number) => void,
}

const Menu: React.FC<MenuProps> = ({
  countPerson,
  onMaxChanged,
}) => {
  const [max, setMax] = React.useState<number>(10);
  const [editable, setEditable] = React.useState(false);

  const submit = (e: any) => {
    e.preventDefault();
    toggleEditable();
    onMaxChanged(max)
  }

  const toggleEditable = (e?: any): void => {
    if (e) {
      e.preventDefault();
    }
    setEditable(!editable);
  }

  const handleOnChange = (e: any): void => {
    setMax(parseInt(e.target.value))
  }

  return (
    <Box marginBottom={4} marginTop={4}>
      <Text fontSize="sm">Max de personnes</Text>
      <form onSubmit={submit}>
        <Flex>
          <Input
            value={max}
            isDisabled={!editable}
            marginRight={4}
            onChange={handleOnChange}
          />
          {
            editable ? (
              <Button
                colorScheme="blue"
                type="submit"
              >
                Engistrer
              </Button>
            ) : (
                <Button
                  colorScheme="blue"
                  onClick={toggleEditable}
                >
                  Modifier
                </Button>
              )
          }
        </Flex>
      </form>
    </Box>
  );
}

export default Menu;