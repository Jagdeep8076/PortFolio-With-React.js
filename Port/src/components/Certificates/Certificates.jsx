import { useState, useRef, useEffect, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { certificates } from "./certificatesData";

// Error Boundary taaki koi image missing hone par poori screen crash na ho
class CanvasErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn("Texture Load Failed:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
          Preview unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

const Certificate3DCard = ({ imageUrl }) => {
  const groupRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();
    
    loader.load(
      imageUrl,
      (loadedTexture) => {
        if (isMounted) {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          setTexture(loadedTexture);
        }
      },
      undefined,
      () => {
        // Agar image na mile to fallback placeholder texture
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 340;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, 512, 340);
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Certificate Preview", 256, 170);
        
        const fallbackTex = new THREE.CanvasTexture(canvas);
        if (isMounted) setTexture(fallbackTex);
      }
    );

    return () => {
      isMounted = false;
      if (texture) texture.dispose();
    };
  }, [imageUrl]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.22;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[6.2, 4.05, 0.18]} radius={0.16} smoothness={5}>
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.25}
        />
      </RoundedBox>

      {texture && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[5.85, 3.65]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.05}
            roughness={0.35}
          />
        </mesh>
      )}

      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[5.9, 3.7]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.04}
          roughness={0.1}
          metalness={0.1}
          transmission={0.2}
        />
      </mesh>
    </group>
  );
};

const Certificate3DViewer = ({ imageUrl }) => {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-[#050505] md:h-[380px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <CanvasErrorBoundary>
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 35,
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[4, 5, 6]} intensity={3} />
          <directionalLight position={[-4, -2, 4]} intensity={1.2} />

          <Certificate3DCard key={imageUrl} imageUrl={imageUrl} />
        </Canvas>
      </CanvasErrorBoundary>

      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-medium tracking-[0.18em] text-white/60 backdrop-blur-md">
          3D CERTIFICATE
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[9px] tracking-[0.25em] text-white/30">
          MOVE YOUR CURSOR
        </span>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCert, setActiveCert] = useState(certificates[0]);

  const categories = [
    "All",
    "Development",
    "AI & Data",
    "Cloud",
    "Professional Skills",
  ];

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  return (
    <section
      id="certificates"
      className="min-h-screen w-full bg-[#050505] px-5 py-24 text-white md:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
              // My Achievements
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
              Certificates <span className="text-white/25">& Achievements</span>
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/45">
              A collection of certifications and achievements representing my
              continuous learning and technical growth.
            </p>
          </div>

          <div className="hidden text-right md:block">
            <p className="font-serif text-xs italic text-white/30">
              “Learning never exhausts the mind.”
            </p>
            <span className="text-[9px] text-white/20">— Leonardo da Vinci</span>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-[10px] transition-all duration-300 ${
                selectedCategory === category
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {filteredCertificates.map((certificate) => (
              <button
                key={certificate.id}
                type="button"
                onClick={() => setActiveCert(certificate)}
                className={`group overflow-hidden rounded-2xl border bg-[#090909] p-3 text-left transition-all duration-500 hover:-translate-y-1 ${
                  activeCert?.id === certificate.id
                    ? "border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
                  <img
                    src={certificate.media}
                    alt={certificate.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-2 py-1 font-mono text-[8px] text-white/60 backdrop-blur">
                    0{certificate.id}
                  </span>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold text-white/60">
                      {certificate.issuer}
                    </span>
                    <span className="font-mono text-[9px] text-white/30">
                      {certificate.issueDate}
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-2 text-sm font-bold text-white">
                    {certificate.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[8px] text-white/45"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-white/5 pt-3 text-[9px] font-medium tracking-wider text-white/35 transition group-hover:text-white">
                    VIEW CREDENTIAL ↗
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5">
            {activeCert && (
              <div className="sticky top-8 overflow-hidden rounded-2xl border border-white/10 bg-[#090909]">
                <Certificate3DViewer imageUrl={activeCert.media} />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/60">
                      {activeCert.issuer}
                    </span>
                    <span className="font-mono text-[9px] text-white/30">
                      {activeCert.issueDate}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-black tracking-tight">
                    {activeCert.name}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-white/45">
                    {activeCert.summary}
                  </p>

                  <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                      Credential ID
                    </p>
                    <p className="mt-1 break-all font-mono text-[10px] text-white/55">
                      {activeCert.credentialId || "N/A"}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                      Skills Covered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[9px] text-white/55"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    {activeCert.credentialUrl && (
                      <a
                        href={activeCert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-white py-3 text-center text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-white/85"
                      >
                        View Full Certificate ↗
                      </a>
                    )}

                    <a
                      href={activeCert.media}
                      download
                      className="rounded-xl border border-white/10 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-white/60 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      Download Certificate ↓
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;