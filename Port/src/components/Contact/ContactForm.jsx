import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
    }, 1500);
  };

  return (
    <div
      data-contact-form
      className="
        relative
        w-full
        max-w-[560px]
        border
        border-white/10
        bg-white/[0.015]
        p-6
        backdrop-blur-sm
        md:p-8
        lg:p-10
      "
    >
      {/* SCANNING LINE */}

      <div
        data-form-scan
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-px
          w-24
          bg-white
          opacity-0
          shadow-[0_0_20px_rgba(255,255,255,0.8)]
        "
      />

      <div className="mb-10 flex items-center justify-between">
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-white/40
          "
        >
          Project Intake
        </p>

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/20
          "
        >
          01 — 03
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* NAME */}

        <div data-form-field>
          <label
            htmlFor="name"
            className="
              mb-3
              block
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            01 / Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="
              w-full
              border-b
              border-white/15
              bg-transparent
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-white/20
              transition-colors
              focus:border-white/60
            "
          />
        </div>

        {/* EMAIL */}

        <div data-form-field>
          <label
            htmlFor="email"
            className="
              mb-3
              block
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            02 / Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="
              w-full
              border-b
              border-white/15
              bg-transparent
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-white/20
              transition-colors
              focus:border-white/60
            "
          />
        </div>

        {/* MESSAGE */}

        <div data-form-field>
          <label
            htmlFor="message"
            className="
              mb-3
              block
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            03 / Project Details
          </label>

          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Tell me about your project..."
            className="
              w-full
              resize-none
              border-b
              border-white/15
              bg-transparent
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-white/20
              transition-colors
              focus:border-white/60
            "
          />
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={status === "sending"}
          data-send-button
          className="
            group
            relative
            mt-3
            flex
            w-full
            items-center
            justify-between
            overflow-hidden
            border
            border-white/20
            px-5
            py-4
            text-left
            transition-colors
            hover:border-white/60
          "
        >
          <span
            className="
              relative
              z-10
              text-[9px]
              uppercase
              tracking-[0.35em]
            "
          >
            {status === "idle" && "Send Transmission →"}
            {status === "sending" && "Transmitting..."}
            {status === "sent" && "Message Received ✓"}
          </span>

          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-white
              transition-transform
              duration-500
              group-hover:translate-x-0
            "
          />

          <span
            className="
              relative
              z-10
              text-white/40
              transition-colors
              group-hover:text-black
            "
          >
            ↗
          </span>
        </button>

      </form>
    </div>
  );
};

export default ContactForm;