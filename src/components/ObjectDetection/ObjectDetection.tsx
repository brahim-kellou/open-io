import React, { useEffect, useRef } from 'react';
import useLoadModel from './useLoadModel';
import useLoadVideo from './useLoadVideo';
import { draw } from './utils';

interface ObjectDetectionOptions {
  width?: number,
  height?: number,
}

const ObjectDetection: React.FC<ObjectDetectionOptions> = ({
  width,
  height
}: ObjectDetectionOptions) => {
  const canvasRef = useRef<any>();
  const videoRef = useRef<any>();

  const video = useLoadVideo({
    width,
    height,
    videoRef
  });
  const model = useLoadModel();

  useEffect(() => {
    return () => { }
  }, []);

  useEffect(() => {
    if (!model || !video) return () => { }

    let reqAnimation: any;
    const ctx = canvasRef.current.getContext("2d");

    const detect = async () => {
      const detection = await model.detect(videoRef.current)
      console.log(detection)

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      draw(detection, ctx);

      reqAnimation = requestAnimationFrame(detect);
    }
    detect()

    return () => {
      cancelAnimationFrame(reqAnimation);
    }
  }, [model, video])

  return (
    <>
      <h1>OpenIO</h1>
      <canvas
        width={width} height={height}
        ref={canvasRef}
      />
      <video
        width={width} height={height}
        ref={videoRef}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default ObjectDetection;