import { useRef } from "react";
import Button from "../components/Button";
import gsap from "gsap";

const GsapFromTo = () => {
  const box3Ref = useRef<HTMLDivElement>(null);

  const slideAcross = () => {
    gsap.fromTo(
      box3Ref.current,
      // from
      {
        x: -150,
        opacity: 0,
        scale: 0.5,
        rotation: -180,
      },

      //to
      {
        x: 150,
        opacity: 1,
        scale: 1.2,
        rotation: 180,
        duration: 2,
        ease: "power2.inOut",
      }
    );
  };

  const colorChange = () => {
    gsap.fromTo(
      box3Ref.current,
      //from
      {
        backgroundColor: "#9b59b6",
        borderRadius: "8px",
        scale: 1,
      },

      //to
      {
        backgroundColor: "#e67e22",
        borderRadius: "50%",
        scale: 1.3,
        duration: 3,
        // ease: "elastic.out(1, 0.3)",
        ease: "power3.out",
      }
    );
  };

  const complexAnimation = () => {
    gsap.fromTo(
      box3Ref.current,
      // FROM
      {
        x: -200,
        y: -100,
        rotation: 0,
        scale: 0.3,
        opacity: 0.3,
      },
      // TO
      {
        x: 100,
        y: 50,
        rotation: 720,
        scale: 1,
        opacity: 1,
        duration: 3,
        ease: "bounce.out",
      }
    );
  };

  const reset = () => {
    gsap.set(box3Ref.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: "#9b59b6",
      borderRadius: "8px",
    });
  };
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">GSAP FromTo()</h1>
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <p>
          gsap.fromTo() gives you total control over an animation by letting you
          explicitly define both the starting point and the ending point.
        </p>
        <p className="mt-3">
          It's the most powerful of the basic GSAP methods because it doesn't
          care about the element's current state. You tell it exactly where to
          start and exactly where to end. Think of it as:{" "}
          <strong className="underline">"Start at A, and animate to B."</strong>
        </p>

        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#e0aaff]">Three Key Parts :-</h2>
          <p>Every gsap.from() animation has two main ingredients:</p>
          <ul>
            <li className="list-disc ml-8">
              <strong>The Target:</strong> The element you want to animate
              (e.g., ".shape").
            </li>
            <li className="list-disc ml-8">
              <strong>from Vars Object:</strong> The first instruction manual {}
              . This tells GSAP what the element's properties should be at the
              very start of the animation.
            </li>
            <li className="list-disc ml-8">
              <strong>to Vars Object:</strong> The second instruction manual {}.
              This tells GSAP what the element's properties should be at the
              very end of the animation. The animation's duration and ease are
              usually placed in this second object.
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
          <Button onClick={slideAcross} text="Slide Across" />
          <Button onClick={colorChange} text="Color Change" />
          <Button onClick={complexAnimation} text="Complex Animation" />
        </div>
        <div
          ref={box3Ref}
          style={{
            width: "80px",
            height: "80px",
            background: "#9b59b6",
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

export default GsapFromTo;
