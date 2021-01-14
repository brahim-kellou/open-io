import * as React from 'react';

interface ObjectDetectionOptions {
  width?: number,
  height?: number,
}

const ObjectDetection: React.FC<ObjectDetectionOptions> = ({
  width,
  height
}: ObjectDetectionOptions) => {
  return (
    <h1>ObjectDetection</h1>
  )
}

export default ObjectDetection;