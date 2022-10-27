import { useEffect, useRef, useMemo } from 'react';
import { useLoader, useFrame,  } from '@react-three/fiber';
import { gsap } from 'gsap';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader, MathUtils } from 'three';
import { useScroll } from '@react-three/drei';
import { Orb } from '../../models/Orb';
import { OrbOld } from '../../models/OrbOld';
import { Mesh } from 'three';
import { MeshPhongMaterial } from 'three';

function Planet() {
  const sceneRef = useRef(null);
  const planetRef = useRef(null);
  const planetCircleRef = useRef(null);
  const planetCircleMatRef = useRef(null);
  const orbitRef = useRef(null);
  const orbitGroupRef = useRef(null);
  const moon1Ref = useRef(null);
  const moon2Ref = useRef(null);
  const moon3Ref = useRef(null);
  const moon4Ref = useRef(null);

  const scroll = useScroll();

  const orbObj = useLoader(OBJLoader, 'orb/orb.obj');

  // orbObj.traverse(function (node) {
  //   if (node instanceof Mesh) {
  //     // for smoothing
  //     node.geometry.computeVertexNormals();
  //     console.log(node);
  //   }
  //   if (node instanceof Mesh && node.material instanceof MeshPhongMaterial) {
  //     // console.log(node);
  //     geometry = node.geometry;
  //     material = node.material;
  //   }
  // });
  

  const [daymapT, nightmapT, moonT, iconBTC, tt] = useLoader(TextureLoader, [
    '8k_earth_daymap.jpeg',
    '8k_earth_nightmap.jpeg',
    '8k_moon.jpeg',
    'BTC-icon.png',
    'Comp/Comp_00001.png',
  ]);

  console.log("TT ", tt);

  useFrame((state, delta) => {
    //planetRef.current.rotation.y += 0.01;

    orbitGroupRef.current.rotation.y += -0.01;

    moon1Ref.current.rotation.y += 0.03;
    moon2Ref.current.rotation.y += 0.03;
    moon3Ref.current.rotation.y += 0.03;
    moon4Ref.current.rotation.y += 0.03;

    const r1 = scroll.range(0, 1 / 3);
    const r2 = scroll.range(1 / 2, 1 / 2);

    sceneRef.current.position.x = MathUtils.damp(sceneRef.current.position.x, (2 * r1) + (-2 * r2), 4, delta);
    sceneRef.current.position.y = MathUtils.damp(sceneRef.current.position.y, 2 - (2.5 * r1) - (0.8 * r2), 4, delta);
    sceneRef.current.position.z = MathUtils.damp(sceneRef.current.position.z, -5 + (9 * r1) + (3.5 * r2), 4, delta);
    sceneRef.current.rotation.x = MathUtils.damp(sceneRef.current.rotation.x, 0.4 - (0.1 * r1) + (1.27 * r2), 4, delta);
    sceneRef.current.rotation.y = MathUtils.damp(sceneRef.current.rotation.y, 0.6 - (0.1 * r1) - (0.5 * r2), 4, delta);
    sceneRef.current.rotation.z = MathUtils.damp(sceneRef.current.rotation.z, 0.25 - (0.25 * r2), 4, delta);

    planetRef.current.rotation.x = MathUtils.damp(planetRef.current.rotation.x, -0.4 + (0.1 * r1) - (1.27 * r2), 4, delta);
    planetRef.current.rotation.y = MathUtils.damp(planetRef.current.rotation.y, -0.6 + (0.1 * r1) + (0.5 * r2), 4, delta);
    planetRef.current.rotation.z = MathUtils.damp(planetRef.current.rotation.z, -0.25 + (0.25 * r2), 4, delta);

    orbitGroupRef.current.position.x = MathUtils.damp(orbitGroupRef.current.position.x, -0.2 + (0.2 * r2), 4, delta);
    orbitGroupRef.current.position.y = MathUtils.damp(orbitGroupRef.current.position.y, 0 - (1.4 * r2), 4, delta);
    orbitGroupRef.current.position.z = MathUtils.damp(orbitGroupRef.current.position.z, 0 + (0.9 * r2), 4, delta);


  }, []);

  const frameCount = 209;
  const currentFrame = (i) => {
    let img;
    if (i + 1 < 10) {
      img = `/CompW2/Comp_0000${i + 1}.webp`;
    } else {
      if (i + 1 >= 10 && i + 1 < 100) {
        img = `/CompW2/Comp_000${i + 1}.webp`;
      } else {
        img = `/CompW2/Comp_00${i + 1}.webp`;
      }
    }
    return img;
  };

  const images = [];
  const clubbys = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    // const img = new Image();
    // img.src = currentFrame(i);
    // images.push(img);
    images.push(currentFrame(i));
  }

  const texts = useLoader(TextureLoader, [
    ...images
  ]);

  useEffect(() => {
    //position={[0, 2, -5]} rotation={[0.4, 0.6, 0.25]}
    //position={[2, -0.5, 4]} rotation={[0.3, 0.5, 0.25]}
    //position={[0, -1.3, 7.5]} rotation={[1.57, 0, 0]}

    // canvas.current.width = 1400;
    // canvas.current.height = 1400;
    // const context = canvas.current.getContext('2d');

    const an = gsap.to(clubbys, {
      frame: frameCount - 1,
      snap: 'frame',
      paused: true,
      repeat: -1,
      ease: 'none',
      duration: 8,
      onUpdate: render,
    });
    
    console.log("Circle ", planetCircleRef.current);
    console.log("CircleMat ", planetCircleMatRef.current);

    function render() {
      planetCircleMatRef.current.map = texts[clubbys.frame];
      //planetCircleMatRef.current.toneMapped = false;
      //planetCircleMatRef.current.shininess = 0;
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // context.drawImage(images[clubbys.frame], 0, 0);
    }
    console.log("CircleMat MAP ", planetCircleMatRef.current.map);

    an.play();
  }, []);

  return (
    <group position={[0, 2, -5]} rotation={[0.4, 0.6, 0.25]} ref={sceneRef}>
      {/* <mesh position={[0, 0, 0]} ref={planetRef}>
        <sphereGeometry args={[1, 64, 32]}/>
        <meshStandardMaterial map={daymapT} />
      </mesh> */}
      <mesh position={[0, 0, 0]} rotation={[-0.4, -0.6, -0.25]} ref={planetRef}>
        {/* <Orb/> */}
        <circleGeometry args={[1.2, 128]} ref={planetCircleRef}/>
        <meshStandardMaterial ref={planetCircleMatRef} attach="material" transparent={true} />
        {/* <OrbOld /> */}
        {/* <primitive object={orbObj} scale={0.12} /> */}
        {/* <sphereGeometry args={[1, 64, 32]} /> */}
        {/* <meshStandardMaterial map={orb_albedo} normalMap={orb_normal} roughnessMap={orb_roughness} emissiveMap={orb_emissive}/> */}
      </mesh>
      <group position={[-0.2, 0, 0]} ref={orbitGroupRef}> {/*position={[0, -1.4, 0.9]}*/}
        <mesh rotation={[1.57, 0, 0]} ref={orbitRef}> 
          <torusGeometry args={[2, 0.005, 30, 200]}/>
          <meshStandardMaterial color={0xffffff} />
        </mesh>
        <mesh position={[0, 0, 2]} ref={moon1Ref}>
          <sphereGeometry args={[0.2, 64, 32]}/>
          <meshStandardMaterial map={moonT} />
        </mesh>
        <mesh position={[-2, 0, 0]} ref={moon2Ref}>
          <sphereGeometry args={[0.2, 64, 32]} />
          <meshStandardMaterial map={moonT} />
        </mesh>
        <mesh position={[0, 0, -2]} ref={moon3Ref}>
          <sphereGeometry args={[0.2, 64, 32]} />
          <meshStandardMaterial map={moonT} />
        </mesh>
        <mesh position={[2, 0, 0]} ref={moon4Ref}>
          <sphereGeometry args={[0.2, 64, 32]} />
          <meshStandardMaterial map={moonT} />
        </mesh>
      </group>

      {/* <group ref={groupRef}>
        <mesh rotation={[1.57, 0, 0]} ref={torusRef}>
          <torusGeometry args={[2, 0.005, 30, 200]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
        <mesh position={[0, 0, 2]} ref={circle1Ref}>
          <circleGeometry args={[0.2, 128]} />
          <meshStandardMaterial map={iconBTC} />
        </mesh>
        <mesh position={[-2, 0, 0]} ref={circle2Ref}>
          <circleGeometry args={[0.2, 128]} />
          <meshStandardMaterial map={iconBTC} />
        </mesh>
        <mesh position={[0, 0, -2]} ref={circle3Ref}>
          <circleGeometry args={[0.2, 128]} />
          <meshStandardMaterial map={iconBTC} />
        </mesh>
        <mesh position={[2, 0, 0]} ref={circle4Ref}>
          <circleGeometry args={[0.2, 128]} />
          <meshStandardMaterial map={iconBTC} />
        </mesh>
      </group> */}
    </group>
  );
}

export default Planet;