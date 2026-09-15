import { forwardRef } from "react";

const DeliveryManifest = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="
        absolute
        bottom-[12%]
        left-1/2
        z-[40]
        w-[min(88vw,540px)]
        -translate-x-1/2
        border
        border-white/15
        bg-black/90
        p-6
        opacity-0
        shadow-[0_20px_80px_rgba(0,0,0,0.7)]
        backdrop-blur-xl
        md:p-8
      "
    >
      {/* HEADER */}
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
          border-b
          border-white/10
          pb-4
        "
      >
        <p
          data-manifest-item
          className="
            text-[9px]
            uppercase
            tracking-[0.42em]
            text-zinc-500
          "
        >
          Delivery Manifest
        </p>

        <p
          data-manifest-item
          className="
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-zinc-600
          "
        >
          JS / 001
        </p>
      </div>

      {/* MAIN */}
      <div data-manifest-item>
        <p
          className="
            text-2xl
            font-light
            uppercase
            tracking-[0.12em]
            md:text-4xl
          "
        >
          My Portfolio
        </p>

        <p
          className="
            mt-2
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-zinc-500
          "
        >
          Digital delivery confirmed
        </p>
      </div>

      {/* INFORMATION */}
      <div
        className="
          mt-7
          grid
          grid-cols-2
          gap-3
          border-y
          border-white/10
          py-5
          sm:grid-cols-4
        "
      >
        <ManifestItem value="06" label="Projects" />
        <ManifestItem value="12" label="Skills" />
        <ManifestItem value="03" label="Focus" />
        <ManifestItem value="01" label="Identity" />
      </div>

      {/* STATUS */}
      <div
        data-manifest-item
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.38em]
            text-zinc-400
          "
        >
          Design · Code · Create
        </p>

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/40
          "
        >
          Delivered
        </span>
      </div>
    </section>
  );
});

const ManifestItem = ({ value, label }) => {
  return (
    <div data-manifest-item>
      <p className="text-lg font-light">
        {value}
      </p>

      <p
        className="
          mt-1
          text-[8px]
          uppercase
          tracking-[0.25em]
          text-zinc-600
        "
      >
        {label}
      </p>
    </div>
  );
};

DeliveryManifest.displayName = "DeliveryManifest";

export default DeliveryManifest;