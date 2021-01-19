import * as React from 'react';
import { Grid, GridItem, Box, } from "@chakra-ui/react"
import ObjectDetection from '../ObjectDetection';
import Menu from '../Menu';
import '../styles.css';

const Home = () => {
  const [countPerson, setCountPerson] = React.useState<number>(0);
  const onDetection = (objects: any[]) => {
    const count = objects.filter(obj => obj.class === "person").length;
    console.log(count);
    setCountPerson(count);
  }
  return (
    <Box className="home" width="100%" height="100vh">
      <Grid
        height="100%"
        templateColumns="repeat(12, 1fr)"
      >
        <GridItem
          colSpan={3}
        >
          <Menu
            countPerson={countPerson}
          />
        </GridItem>
        <GridItem
          colSpan={9}
        >
          <ObjectDetection
            width={800}
            height={450}
            onDetection={onDetection}
          />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Home;