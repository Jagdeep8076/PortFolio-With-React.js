import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0.1,
        10
      );

    camera.position.z = 2;

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );

    const count =
      window.innerWidth < 768
        ? 160
        : 450;

    const positions =
      new Float32Array(count * 3);

    const speed =
      new Float32Array(count);

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const index = i * 3;

      positions[index] =
        (Math.random() - 0.5) * 2;

      positions[index + 1] =
        (Math.random() - 0.5) * 2;

      positions[index + 2] = 0;

      speed[i] =
        0.00015 +
        Math.random() * 0.0004;
    }

    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const material =
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.009,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending:
          THREE.AdditiveBlending,
      });

    const particles =
      new THREE.Points(
        geometry,
        material
      );

    scene.add(particles);

    const resize = () => {
      renderer.setSize(
        window.innerWidth,
        window.innerHeight,
        false
      );

      const aspect =
        window.innerWidth /
        window.innerHeight;

      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;

      camera.updateProjectionMatrix();
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    let frame;

    const animate = () => {
      const array =
        geometry.attributes.position
          .array;

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const index = i * 3;

        array[index + 1] +=
          speed[i];

        if (
          array[index + 1] > 1.1
        ) {
          array[index + 1] =
            -1.1;

          array[index] =
            (Math.random() - 0.5) * 2;
        }
      }

      geometry.attributes.position.needsUpdate =
        true;

      particles.rotation.z +=
        0.0001;

      renderer.render(
        scene,
        camera
      );

      frame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "resize",
        resize
      );

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
      "
    />
  );
};

export default ParticleBackground;