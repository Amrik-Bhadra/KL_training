import { useEffect, useRef } from "react";
import Button from "../components/Button";
import gsap from "gsap";

const GsapFrom = () => {
  const box2Ref = useRef<HTMLDivElement>(null);

  const animateFromLeft = () => {
    gsap.from(box2Ref.current, {
      x: -200, // Starts 200px left, animates to current position (0)
      duration: 1,
      ease: "power2.out",
    });
  };

  const animateFromInvisible = () => {
    gsap.from(box2Ref.current, {
      opacity: 0, // Starts invisible, animates to current opacity (1)
      scale: 0, // Starts tiny, animates to current scale (1)
      duration: 1,
      ease: "back.out(1.7)",
    });
  };

  const animateFromRotated = () => {
    gsap.from(box2Ref.current, {
      rotation: 720, // Starts rotated, animates to current rotation (0)
      duration: 2,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const reset = () => {
    gsap.to(box2Ref.current, {
      x: 0,
      rotation: 0,
      scale: 1,
      duration: 0.5,
    });
  };

  // Entrance animation on mount
  useEffect(() => {
    gsap.set(box2Ref.current, { opacity: 1 }); // Ensure it's visible first
    gsap.from(box2Ref.current, {
      x: 0,
      scale: 0.5,
      duration: 1,
      delay: 0.2,
      ease: "bounce.out",
    });
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">GSAP From()</h1>
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <p>
          Animate FROM initial values. Think of it like this: your element is
          already sitting at its final destination on the screen (as defined by
          your HTML and CSS). You then tell GSAP,
          <strong className="underline">
            "Animate it from this other state."
          </strong>
        </p>
        <p className="mt-3">
          GSAP will pretend your element starts at the position you define and
          then smoothly animate it back to where it was originally.
        </p>

        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#e0aaff]">Two Key Parts :-</h2>
          <p>Every gsap.from() animation has two main ingredients:</p>
          <ul>
            <li className="list-disc ml-8">
              <strong>The Target:</strong> This is the element you want to move
              or change. You can select it just like in CSS, using a class name
              (".box"), an ID ("#logo"), or a tag ("button").
            </li>
            <li className="list-disc ml-8">
              <strong>The Vars Object:</strong> The instruction manual {} that
              tells the target where its journey should begin.
            </li>
          </ul>
        </div>
      </div>

      {/* demo */}
      <div className="mt-3 border border-gray-400/50 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl mb-3">DEMO:</h2>
          <Button onClick={reset} text="Reset" />
        </div>
        <div className="flex items-center gap-x-3">
          <Button onClick={animateFromLeft} text="Move From Left" />
          <Button onClick={animateFromInvisible} text="From Invisible" />
          <Button onClick={animateFromRotated} text="From Rotated" />
        </div>
        <div
          ref={box2Ref}
          style={{
            width: "110px",
            height: "110px",
            background: "#ff006e",
            margin: "40px auto",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GsapFrom;
