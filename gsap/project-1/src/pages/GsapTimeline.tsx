import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/custom.css";
import Button from "../components/Button";
import { timelineControls } from "../utils/dataProvider";

const GsapTimeline = () => {
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  const withoutTimeline1 = () => {
    gsap.to(box1Ref.current, { x: 200, duration: 1 });
    gsap.to(box2Ref.current, { y: 100, duration: 1 });
    gsap.to(box3Ref.current, { rotation: 360, duration: 1 });
  };

  const withTimeline1 = () => {
    const tl = gsap.timeline();
    tl.to(box1Ref.current, { x: 200, duration: 1 });
    tl.to(box2Ref.current, { y: 100, duration: 1 });
    tl.to(box3Ref.current, { rotation: 360, duration: 1 });
  };

  const reset1 = () => {
    gsap.set([box1Ref.current, box2Ref.current, box3Ref.current], {
      x: 0,
      y: 0,
      rotation: 0,
    });
  };

  //   timeline overlapping begins
  const box4Ref = useRef<HTMLDivElement>(null);
  const box5Ref = useRef<HTMLDivElement>(null);

  const waitAnimation = () => {
    const tl2 = gsap.timeline();
    // Example 1: Start 0.5 seconds AFTER the previous animation ends (adds a gap)
    tl2.to(box4Ref.current, { x: 200, duration: 1 });
    tl2.to(box5Ref.current, { y: 100, duration: 1 }, "+=2"); // wait for 2s after box1 then box2 starts
  };

  const overlapAnimation = () => {
    const tl2 = gsap.timeline();
    // Example 2: Start 0.5 seconds BEFORE the previous animation ends (overlap)
    tl2.to(box4Ref.current, { x: 200, duration: 1 });
    tl2.to(box5Ref.current, { y: 100, duration: 1 }, "-=0.5"); // Overlap by 0.5s
  };

  const exactAnimation = () => {
    const tl2 = gsap.timeline();
    // Example 3: Start at the EXACT same time as the previous animation
    tl2.to(box4Ref.current, { x: 200, duration: 1 });
    tl2.to(box5Ref.current, { y: 100, duration: 1 }, "<"); // The "<" symbol means "with previous"
  };

  const reset2 = () => {
    gsap.set([box4Ref.current, box5Ref.current], {
      x: 0,
      y: 0,
    });
  };
  //   timeline overlapping ends

  // timeline control begins
  const ballRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create the timeline instance and store it in the ref
    tl.current = gsap.timeline({
      // The onUpdate callback fires every time the animation updates (many times per second).
      // This is the perfect place to sync the animation's state with React's state.
      onUpdate: () => {
        if (tl.current) {
          setProgress(tl.current.progress());
        }
      },

      // set paused to true initially so it does not play on load
      paused: true,
    });

    // add animations to created timeline
    if (tl.current && ballRef.current) {
      tl.current
        .to(ballRef.current, {
          x: 400,
          rotation: 360,
          duration: 4,
          ease: "power2.inOut",
        })
        .to(
          ballRef.current,
          {
            backgroundColor: "#ff9f1c", // Change to orange
            scale: 1.5,
            duration: 3,
          },
          "-=0.5" // Overlap with the previous animation by 0.5s)
        )
        .to(ballRef.current, {
          x: 0,
          scale: 1,
          backgroundColor: "#9b59b6",
          duration: 5,
          ease: "bounce.out",
        });
    }
  }, []);

  const handlePlay = () => tl.current?.play();
  const handlePause = () => tl.current?.pause();
  const handleReverse = () => tl.current?.reverse();
  const handleRestart = () => tl.current?.restart();
  const handleTimeScale = (val: number) => tl.current?.timeScale(val);

  const handleResetTimeline = () => {
    // Stop the animation and jump to the beginning
    tl.current?.seek(0).pause().timeScale(1);

    // Instantly set all animated properties back to their starting values
    gsap.set(ballRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      backgroundColor: "f72585",
      
    });

    setProgress(0);
  };

  // timeline control ends

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-bold">GSAP Timeline()</h1>

      {/* content part 1 */}
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <p>
          If individual tweens (gsap.to, gsap.from) are like telling a single
          actor to perform a single action, a timeline is like being the
          director of an entire movie. It's a powerful container that lets you
          organize and chain multiple animations together. You can play, pause,
          reverse, and control the entire sequence as one single unit.
        </p>

        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#e0aaff]">
            Creating Timeline :-
          </h2>
          <p className="mb-2">
            To start, you create an empty timeline instance. It's like getting a
            blank roll of film, ready for you to add scenes. You'll usually
            store it in a variable.
          </p>
          <code className="bg-black p-2 rounded-md">
            const tl = gsap.timeline();
          </code>
          <p className="mt-2">
            Now, tl is your timeline object. You'll add all your animations to
            it.
          </p>
          re{" "}
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#e0aaff]">
            Timeline vs Individual Tweens:-
          </h2>
          <p className="mb-2">
            Imagine you want three boxes to move one after the other. If you
            write three separate{" "}
            <code className="bg-black p-2 rounded-md">gsap.to()</code> tweens,
            they will all start at the exact same time, creating a chaotic mess.
          </p>

          <div className="p-2 bg-black rounded-md w-fit">
            <code>{`gsap.to(".box1", { x: 200, duration: 1 });`}</code>
            <br />
            <code>{`gsap.to(".box2", { y: 100, duration: 1 });`}</code>
            <br />
            <code>{`gsap.to(".box3", { rotation: 360, duration: 1 });`}</code>
          </div>

          <p className="my-2">
            A timeline solves this by creating a queue. It waits for one
            animation to finish before starting the next.
          </p>
          <div className="p-2 bg-black rounded-md w-fit">
            <code>{`const tl = gsap.timeline();`}</code>
            <br />
            <code>{`tl.to(".box1", { x: 200, duration: 1 });`}</code>
            <br />
            <code>{`tl.to(".box2", { y: 100, duration: 1 });`}</code>
            <br />
            <code>{`tl.to(".box3", { rotation: 360, duration: 1 });`}</code>
          </div>
        </div>
      </div>

      {/* demo of content part 1 */}
      <div className="mt-3 border border-gray-400/50 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl mb-3">DEMO:</h2>
          <Button onClick={reset1} text="Reset" />
        </div>
        <div className="flex items-center gap-x-3">
          <Button onClick={withoutTimeline1} text="Without Timeline" />
          <Button onClick={withTimeline1} text="With Timeline" />
        </div>
        <div className="flex items-center gap-x-3 w-fit mt-5">
          <div
            ref={box1Ref}
            className="box1"
            style={{
              width: "80px",
              height: "80px",
              background: "#9b59b6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          ></div>
          <div
            ref={box2Ref}
            className="box2"
            style={{
              width: "80px",
              height: "80px",
              background: "#ff9f1c",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          ></div>
          <div
            ref={box3Ref}
            className="box3"
            style={{
              width: "80px",
              height: "80px",
              background: "#8cb369",
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

      {/* content part 2 - sequencing animation*/}
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <div className="">
          <h2 className="font-bold text-lg text-[#e0aaff]">
            Sequencing Animation:-
          </h2>
          <p className="mb-2">
            You add animations (tweens) to a timeline by calling{" "}
            <code>.to()</code>, <code>.from()</code>, or <code>.fromTo()</code>{" "}
            directly on your timeline variable. This is often done by "chaining"
            the methods together.
          </p>

          <div className="p-2 bg-black rounded-md w-fit">
            <pre>
              <code>{`tl.to(".box", { x: 200 })
  .to(".circle", { scale: 2 })
  .from(".heading", { opacity: 0 });`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* content part 3 - Overlapping animation */}
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <div className="">
          <h2 className="font-bold text-lg text-[#e0aaff]">
            Overlapping Animations (The Position Parameter):-
          </h2>
          <p className="mb-2">
            This is where timelines become incredibly powerful. You can control
            the exact start time of any animation by adding a "position
            parameter" after the vars object.
          </p>

          <div className="p-2 bg-black rounded-md w-fit">
            <pre>
              <code>{`// Syntax: .to(target, {vars}, position);

// Example 1: Start 0.5 seconds AFTER the previous animation ends (adds a gap)
tl.to(".box1", { x: 200, duration: 1 });
tl.to(".box2", { y: 100, duration: 1 }, "+=0.5"); // Wait 0.5s

// Example 2: Start 0.5 seconds BEFORE the previous animation ends (overlap)
tl.to(".box1", { x: 200, duration: 1 });
tl.to(".box2", { y: 100, duration: 1 }, "-=0.5"); // Overlap by 0.5s

// Example 3: Start at the EXACT same time as the previous animation
tl.to(".box1", { x: 200, duration: 1 });
tl.to(".box2", { y: 100, duration: 1 }, "<"); // The "<" symbol means "with previous"`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* demo of content part 3 - overlapping animation */}
      <div className="mt-3 border border-gray-400/50 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl mb-3">DEMO:</h2>
          <Button onClick={reset2} text="Reset" />
        </div>
        <div className="flex items-center gap-x-3">
          <Button onClick={waitAnimation} text="Wait 2s" />
          <Button onClick={overlapAnimation} text="Overlap" />
          <Button onClick={exactAnimation} text="Start Exact" />
        </div>
        <div className="flex items-center gap-x-3 w-fit mt-5">
          <div
            ref={box4Ref}
            className="box1"
            style={{
              width: "80px",
              height: "80px",
              background: "#9b59b6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          ></div>
          <div
            ref={box5Ref}
            className="box2"
            style={{
              width: "80px",
              height: "80px",
              background: "#ff9f1c",
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

      {/* content part 3 - Overlapping animation */}
      <div className="w-full bg-indigo-300/30 p-5 rounded-2xl">
        <div className="">
          <h2 className="font-bold text-lg text-[#e0aaff]">
            Timeline controlls:-
          </h2>
          <p className="mb-2">
            Think of these like the remote control for your animation sequence.
          </p>

          <ul className="flex flex-col space-y-4">
            {timelineControls.map((control, index) => (
              <li key={index}>
                <code className="p-2 bg-black rounded-md mr-2">
                  {control.method}
                </code>
                : {control.description}
              </li>
            ))}
          </ul>
          <p className="mb-3 mt-6 font-semibold text-lg">Example Code</p>
          <div className="p-2 bg-black rounded-md w-fit mb-3">
            <pre>
              <code>{`const handlePlay = () => tl.current?.play();
const handlePause = () => tl.current?.pause();
const handleReverse = () => tl.current?.reverse();
const handleRestart = () => tl.current?.restart();
const handleTimeScale = (val: number) => tl.current?.timeScale(val)`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* demo of content part 4 - Timeline Controls */}
      <div className="mt-3 border border-gray-400/50 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl mb-3">DEMO:</h2>
          <Button onClick={handleResetTimeline} text="Reset" />
        </div>
        <div className="flex items-center gap-x-3">
          <Button onClick={handlePlay} text="Play" />
          <Button onClick={handlePause} text="Pause" />
          <Button onClick={handleReverse} text="Reverse" />
          <Button onClick={handleRestart} text="Restart" />
          <Button onClick={() => handleTimeScale(2)} text="Timescale (2x)" />
        </div>
        <div className="flex flex-col justify-center gap-x-3 w-full mt-5">
          <div
            ref={ballRef}
            style={{
              width: "80px",
              height: "80px",
              background: "#f72585",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ball
          </div>

          <div
            id="progressbar"
            className="w-full bg-gray-700 rounded-full h-2.5 mt-5"
          >
            <div
              className="bg-indigo-400 h-2.5 rounded-full"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>

          <p className="text-center text-sm mt-2 font-semibold">
            Progress: {Math.round(progress * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default GsapTimeline;
