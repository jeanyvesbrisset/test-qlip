import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
import {Button} from 'antd'

type Video = {
  id: number,
  path: string,
}

function App() {
  const [video, setVideo] = useState<Video | null>(null)

  const generateVerticalClip = async (id: number) => {
    await axios.get(`http://localhost:3000/videos/vertical-auto-crop/${id}`);
  }

  useEffect(() => {
    const fetchVideo = async () => {
        const video = (await axios.get('http://localhost:3000/videos/1')).data
        if (video) {
         setVideo(video)
       }
    }
      
    fetchVideo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=' bg-black min-h-screen p-10'>
        {video && (<>
          <div className='w-50'><ReactPlayer url={'/video_test_qlip.mp4'} controls={true} /></div>
          <Button className='bg-white text-xl m-3' onClick={() => generateVerticalClip(video.id) }>Generate vertical clip with auto-crop</Button>
          </>)}
    </div>
  );
}

export default App;
