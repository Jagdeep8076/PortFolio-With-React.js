import * as THREE from "three";

export function createParticles(canvas) {
  if (!canvas) return () => {};

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    0.1,
    10
  );

  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const count = window.innerWidth < 768 ? 150 : 400;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 2;
    positions[i3 + 1] = (Math.random() - 0.5) * 2;
    positions[i3 + 2] = 0;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.012,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);

  scene.add(particles);

  function resize() {
    renderer.setSize(
      window.innerWidth,
      window.innerHeight,
      false
    );

    const aspect =
      window.innerWidth / window.innerHeight;

    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;

    camera.updateProjectionMatrix();
  }

  resize();

  window.addEventListener("resize", resize);

  let animationFrame;

  function animate() {
    const positions =
      geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3 + 1] += 0.0003;

      if (positions[i3 + 1] > 1.1) {
        positions[i3 + 1] = -1.1;
        positions[i3] =
          (Math.random() - 0.5) * 2;
      }
    }

    geometry.attributes.position.needsUpdate = true;

    particles.rotation.z += 0.0001;

    renderer.render(scene, camera);

    animationFrame =
      requestAnimationFrame(animate);
  }

  animate();

  return function cleanup() {
    cancelAnimationFrame(animationFrame);

    window.removeEventListener("resize", resize);

    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}