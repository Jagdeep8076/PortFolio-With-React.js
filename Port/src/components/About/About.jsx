import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";


const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.1, 3);

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh = new THREE.Mesh(geometry, wireframeMat);
    scene.add(mesh);

    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(geometry, pointsMat);
    scene.add(particles);

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.4;
      targetY = (e.clientY / innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animId;
    const animate = () => {
      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      wireframeMat.dispose();
      pointsMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" />;
};

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scroller = document.querySelector(".portfolio-scroll") || window;

    const ctx = gsap.context(() => {
      gsap.set(".about-reveal", { opacity: 0, y: 30 });
      gsap.set(".about-title-line", { yPercent: 100 });
      gsap.set(".about-photo-wrapper", { opacity: 0, scale: 0.92 });

      gsap.to(".about-title-line", {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top 75%",
        },
      });

      gsap.to(".about-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top 70%",
        },
      });

      gsap.to(".about-photo-wrapper", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-visual",
          scroller,
          start: "top 75%",
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      
      <section
        id="about"
        ref={sectionRef}
        className="relative min-h-screen w-full bg-[#050505] px-6 py-24 font-sans text-neutral-100 md:px-12 lg:px-20"
      >
        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="about-reveal mb-14 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">01 / Profile</span>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">Get to know me</span>
          </header>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <div className="overflow-hidden pb-2">
                <h2 className="text-5xl font-extrabold uppercase tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="about-title-line block">About</span>
                  <span className="about-title-line block text-neutral-500">Me.</span>
                </h2>
              </div>

              <p className="about-reveal mt-8 max-w-lg text-lg font-light leading-relaxed text-neutral-300">
               So I am <span className="font-normal text-white">Jagdeep Singh</span> , Motivated Computer Science student and Web-Developer eager to contribute to innovative tech Solutions.
              </p>

              <p className="about-reveal mt-4 max-w-lg text-sm font-light leading-relaxed text-neutral-400">
                Experienced in building responsive projects using React.js, Tailwind CSS, and JavaScript, with hands-on knowledge in  AI-powered analytics, and predictive modeling.
              </p>

              <div className="about-reveal mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
                > 
                  Resume
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </div>
            </div>

            <div className="about-visual relative flex h-[420px] w-full items-center justify-center sm:h-[500px]">
              <ThreeCanvas />

              <div className="about-photo-wrapper relative z-10 h-64 w-64 overflow-hidden rounded-full border border-white/20 bg-neutral-900 shadow-2xl sm:h-72 sm:w-72">
                <img
                  src="/Store/photo.png"
                  alt="Jagdeep Singh"
                  className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;