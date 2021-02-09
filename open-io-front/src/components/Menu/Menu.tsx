import * as React from 'react';
import { Flex, Input, Button, Box, Text } from "@chakra-ui/react"
import '../styles.css';

interface MenuProps {
  countPerson?: number,
  onMaxChanged: (objects: string) => void,
}

const Menu: React.FC<MenuProps> = ({
  countPerson,
  onMaxChanged,
}) => {
  const [max, setMax] = React.useState<string>("10");
  const [editable, setEditable] = React.useState(true);

  const submit = (e: any) => {
    e.preventDefault();
    toggleEditable();
  }

  const toggleEditable = (e?: any): void => {
    if (e) {
      e.preventDefault();
    }
    console.log(editable)
    setEditable(!editable);
  }

  const handleOnChange = (e: any): void => {
    setMax(e.target.value)
    onMaxChanged(max)
  }

  return (
    <Flex flexDirection="column" className="menu"
      width="100%" height="100%"
    >
      <Box marginBottom={4} marginTop={4}>
        <Text fontSize="sm">Nombre de personnes: {countPerson}</Text>
      </Box>
      <Box marginBottom={4} marginTop={4}>
        <Text fontSize="sm">Nombre maximum des personnes</Text>
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

    </Flex>
  );
}

export default Menu;