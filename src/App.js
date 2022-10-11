import './App.css';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, OrbitControls, PerspectiveCamera, ScrollControls, Scroll, Html, Image } from '@react-three/drei'
import Planet from './components/planet/Planet';
import { Suspense, useEffect, useState } from 'react';
import { MathUtils, NoToneMapping } from 'three';
import Portal from './components/portal/Portal';
import PortalImage from './assets/PortalCirus.svg';
import H from './components/h/H';

function App() {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    console.log("Width ", window.innerWidth);
    console.log("Height ", window.innerHeight);
  }, []);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <Canvas gl={{ antialias: true, toneMapping: NoToneMapping }} linear>
          <ScrollControls
            pages={3}
          >
            <ambientLight intensity={0.4}/>
            {/* <light intensity={1} color="white" position={[-10000, 1000, 1000]} /> */}
            {/* <rectAreaLight position={[0, 0, 10]} intensity={4} width={5} height={10} color='0xffffff'/> */}
            {/* <directionalLight intensity={0.5} position={[-10000, 5000, 10000]} color='white'/> */}
            {/* <directionalLight intensity={0.5} position={[-15000, 0, 10000]} color='white' />
            <directionalLight intensity={0.5} position={[-10000, -5000, 10000]} color='white' /> */}
            {/* <pointLight position={[-1000,100,1000]} intensity={0.5}/> */}
            <spotLight angle={1} position={[-10000, 5000, 10000]} intensity={1}/>
            {/* <ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} /> */}
            <PerspectiveCamera makeDefault args={[45, width / height, 0.1, 5000]} position={[0,0,10]}/>
            {/* <OrbitControls/> */}
            <Portal/>
            <Planet />
            <Scroll html>
              {/* <h1 className="firstSection">First section</h1> */}
              <H className="firstSection">First section</H>
              <h1 className="secondSection">Second section</h1>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
