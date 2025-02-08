"use client";
import { useEffect, useRef, useState } from "react";

export default function GestureRecognition() {
  const videoRef = useRef(null);
  const [gesture, setGesture] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    let camera, hands;

    async function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Ошибка загрузки ${src}`));
        document.body.appendChild(script);
      });
    }

    async function initMediaPipe() {
      try {
        if (!window.Camera) {
          await loadScript(
            "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          );
        }
        if (!window.Hands) {
          await loadScript(
            "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          );
        }
      } catch (err) {
        setError("Ошибка загрузки MediaPipe: " + err.message);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Ошибка доступа к камере: " + err.message);
        return;
      }

      try {
        hands = new window.Hands({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
      } catch (err) {
        setError("Ошибка инициализации Hands: " + err.message);
        return;
      }

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults((results) => {
        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0
        ) {
          detectGesture(results.multiHandLandmarks[0]);
        } else {
          setGesture("");
        }
      });

      if (videoRef.current && window.Camera) {
        camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: window.innerWidth,
          height: window.innerHeight,
        });
        camera.start();
      } else {
        setError("Ошибка инициализации Camera.");
      }
    }

    initMediaPipe();

    return () => {
      if (camera) camera.stop();
    };
  }, []);

  function detectGesture(landmarks) {
    const wrist = landmarks[0]; // Запястье
    const thumbTip = landmarks[4]; // Большой палец (кончик)
    const indexTip = landmarks[8]; // Указательный палец (кончик)
    const middleTip = landmarks[12]; // Средний палец (кончик)
    const ringTip = landmarks[16]; // Безымянный палец (кончик)
    const pinkyTip = landmarks[20]; // Мизинец (кончик)

    const indexBase = landmarks[5]; // Основание указательного пальца
    const middleBase = landmarks[9]; // Основание среднего пальца
    const ringBase = landmarks[13]; // Основание безымянного пальца
    const pinkyBase = landmarks[17]; // Основание мизинца

    // Открытая ладонь ✋ (все пальцы вытянуты)
    if (
      indexTip.y < indexBase.y &&
      middleTip.y < middleBase.y &&
      ringTip.y < ringBase.y &&
      pinkyTip.y < pinkyBase.y
    ) {
      setGesture("✋ МЗДАРОВА ✋");
      return;
    }

    // Лайк 👍 (большой палец вытянут вверх, остальные согнуты)
    if (
      thumbTip.y < wrist.y &&
      indexTip.y > indexBase.y &&
      middleTip.y > middleBase.y &&
      ringTip.y > ringBase.y &&
      pinkyTip.y > pinkyBase.y
    ) {
      setGesture("👍 ВЕРИ НАЙС 👍");
      return;
    }

    // Средний палец 🖕 (только средний палец вытянут)
    if (
      middleTip.y < middleBase.y &&
      indexTip.y > indexBase.y &&
      ringTip.y > ringBase.y &&
      pinkyTip.y > pinkyBase.y
    ) {
      setGesture("🚨 СРЕДНИЙ ПАЛЕЦ 🚨");
      return;
    }

    // Дизлайк 👎 (все пальцы согнуты, большой палец направлен вниз)
    if (
      thumbTip.y > wrist.y &&
      indexTip.y > indexBase.y &&
      middleTip.y > middleBase.y &&
      ringTip.y > ringBase.y &&
      pinkyTip.y > pinkyBase.y
    ) {
      setGesture("👎 ОЧКО 👎");
      return;
    }

    setGesture("");
  }

  return (
    <div
      style={{
        position: "relative",
        width: "auto",
        height: "auto",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {gesture && (
        <p
          className="text-xl sm:text-[2rem]"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          {gesture}
        </p>
      )}
    </div>
  );
}
