import { useEffect, useRef } from 'react';
import { Environment, Lightformer, ContactShadows, OrbitControls, PerspectiveCamera, ScrollControls, Scroll, Html, Image } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MathUtils } from 'three';
import { useScroll } from '@react-three/drei';

function H({children, className}) {
  const portalRef = useRef(null);

  const scroll = useScroll();

  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1 / 3);
    const r2 = scroll.range(1 / 2, 1 / 2);
    const r3 = scroll.visible(1 / 3, 1 / 2);

    portalRef.current.classList.toggle('show', r3)
  }, []);

  return (
      <h1 className={className} ref={portalRef}>
        {children}
      </h1>
  );
}

export default H;