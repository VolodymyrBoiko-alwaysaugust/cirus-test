import { useEffect, useRef } from 'react';
import PortalImage from '../../assets/PortalCirus.svg';
import './Portal.css';
import { Environment, Lightformer, ContactShadows, OrbitControls, PerspectiveCamera, ScrollControls, Scroll, Html, Image } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MathUtils } from 'three';
import { useScroll } from '@react-three/drei';

function Portal() {
  const portalRef = useRef(null);

  const scroll = useScroll();

  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1 / 3);

    portalRef.current.position.z = MathUtils.damp(portalRef.current.position.z, -10 + (10 * r1), 4, delta);
    portalRef.current.scale.x = MathUtils.damp(portalRef.current.scale.x, 11 + (7.3 * r1), 4, delta);
  }, []);

  useEffect(() => {

  }, []);

  return (
    <Image position={[0, 0, -10]} url={PortalImage} transparent scale={[11, 15, 1]} ref={portalRef}/>
  );
}

export default Portal;