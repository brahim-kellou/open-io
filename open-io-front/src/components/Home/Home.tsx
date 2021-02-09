import * as React from 'react';
import { Grid, GridItem, Box, } from "@chakra-ui/react";
import { io } from 'socket.io-client';
import ObjectDetection from '../ObjectDetection';
import Menu from '../Menu';
import { SOCKET_HOST } from '../../config';
import '../styles.css';

const socket = io(SOCKET_HOST, {
  path: '/socket'
});

const Home = () => {
  const [countPerson, setCountPerson] = React.useState<number>(0);
  const countPersonRef = React.useRef<number>(0);

  React.useEffect(() => {
    socket.on('GET_TOTAL_PERSONS', () => {
      socket.emit('TOTAL_PERSONS', countPersonRef.current)
    })
  }, [])

  const onDetection = (objects: any[]) => {
    const count = objects.filter(obj => obj.class === "person").length;

    if (count != countPersonRef.current) {
      console.log(count)
      setCountPerson(() => countPersonRef.current = count);
    }
  }

  const onMaxChanged = (max: string) => {
    socket.emit('MAX_PERSONS', max)
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
            onMaxChanged={onMaxChanged}
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