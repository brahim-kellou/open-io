import * as React from 'react';
import ObjectDetection from '../ObjectDetection';

const Home = () => {
  return (
    <div>
      <ObjectDetection
        width={800}
        height={450}
      />
    </div>
  )
}

export default Home;