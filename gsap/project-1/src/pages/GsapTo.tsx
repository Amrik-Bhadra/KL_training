import gsap from "gsap";
import { useRef } from "react";
import Button from "../components/Button";

const GsapTo = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const animateRight = () => {
    gsap.to(boxRef.current, {
      x: 200, // movies 200px right from its current position
      duration: 1, // takes 1s for this animation
      ease: "power2.out",
    });
  };

  const animateRotate = () => {
    gsap.to(boxRef.current, {
      rotation: 360, // rotate full circle
      duration: 1.5, // take 1.5s
      ease: "bounce.out",
    });
  };

  const animateScale = () => {
    gsap.to(boxRef.current, {
      scale: 1.5, // 150% of original size
      duration: 0.8,
      yoyo: true, // Reverse back
      repeat: 1, // Do it twice (original + 1 repeat)
    });
  };

  const animateBottomRight = () => {
    gsap.to(boxRef.current, {
        x: 200,
        y: 200,
        duration: 1.5,
        yoyo: true, 
    })
  }

  const reset = () => {
    gsap.set(boxRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">GSAP TO()</h1>
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <p>
          Animate TO target values. Think of it as telling an element:{" "}
          <strong className="underline">"Go to this state."</strong>
        </p>
        <p className="mt-3">
          You give it a target (what you want to animate) and then provide a
          list of instructions (where you want it to end up and how it should
          get there). GSAP handles all the complex calculations to create a
          smooth animation from the element's current state to the final state
          you defined.
        </p>

        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#e0aaff]">Two Key Parts :-</h2>
          <p>Every gsap.to() animation has two main ingredients:</p>
          <ul>
            <li className="list-disc ml-8">
              <strong>The Target:</strong> This is the element you want to move
              or change. You can select it just like in CSS, using a class name
              (".box"), an ID ("#logo"), or a tag ("button").
            </li>
            <li className="list-disc ml-8">
              <strong>The Vars Object:</strong> This is a JavaScript object
              (written inside curly braces {}) that acts as your instruction
              manual. It tells the target what to do.
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
          <Button onClick={animateRight} text="Move Right" />
          <Button onClick={animateRotate} text="Rotate 360" />
          <Button onClick={animateScale} text="Scale" />
          <Button onClick={animateBottomRight} text="Move Bottom Right" />
        </div>
        <div
          ref={boxRef}
          style={{
            width: "80px",
            height: "80px",
            background: "#e74c3c",
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

export default GsapTo;
