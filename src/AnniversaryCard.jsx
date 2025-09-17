import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";

const photos = [
  "/Assets/1.jpg",
  "/Assets/2.jpg",
  "/Assets/3.jpg",
  "/Assets/4.jpg",
  "/Assets/5.jpg",
  "/Assets/6.jpg",
  "/Assets/7.jpg",
  "/Assets/8.jpg",
];

export default function AnniversaryCard() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false; // make sure it's unmuted
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((e) => {
          console.log("Mobile autoplay blocked:", e);
        });
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating hearts */}
      <div style={styles.heartsWrapper}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ y: -100, x: Math.random() * window.innerWidth }}
            transition={{ duration: 12 + Math.random() * 5, repeat: Infinity }}
            style={styles.heart}
          >
            <FaHeart size={26} color="rgba(236,72,153,0.6)" />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={styles.title}
      >
        💖 <span className="sparkle-text">Happy Anniversary Baby Boo</span> 💖
      </motion.h1>

      <style>
        {`
          @keyframes sparkle {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .sparkle-text {
            display: inline-block;
            background: linear-gradient(90deg,#ec4899,#f9a8d4,#a855f7,#f9a8d4,#ec4899);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: sparkle 4s linear infinite;
            text-shadow: 0 0 20px rgba(236,72,153,0.6), 0 0 40px rgba(168,85,247,0.4);
          }

          @keyframes shine { 0% { left: -75%; } 100% { left: 125%; } }
          .shine { animation: shine 2s infinite; }

          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 10px #ec4899; }
            50% { transform: scale(1.1); box-shadow: 0 0 20px #f472b6; }
          }
        `}
      </style>

      {/* Slideshow */}
      <div style={styles.slideshow}>
        {photos.map((photo, index) => (
          <motion.img
            key={index}
            src={photo}
            alt={`Memory ${index + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.05,
            }}
            transition={{ duration: 1 }}
            style={styles.image}
          />
        ))}
      </div>

      {/* Shiny Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMessage(!showMessage)}
        style={styles.button}
      >
        <span style={{ position: "relative", zIndex: 1 }}>✨ Click Me ✨</span>
        <span style={styles.shine} className="shine" />
      </motion.button>

      {/* Hidden message */}
      {showMessage && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.message}
        >
          Every moment with you is my favorite memory. 💕 You make my world
          brighter, my days happier, and my heart fuller. Here’s to us, forever
          and always ✨
        </motion.p>
      )}

      {/* Custom Music Player */}
      <div style={styles.player}>
        <button onClick={togglePlay} style={styles.playButton}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
      </div>

      {/* Background Music */}
      <audio ref={audioRef} src="https://docs.google.com/uc?export=download&id=1FDxP8PKe_lf_3LRJ9iL6RMYCtLuFc857" loop preload="auto" />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #000)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  heartsWrapper: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  heart: {
    position: "absolute",
    opacity: 0.4,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "20px 0",
  },
  slideshow: {
    marginTop: "20px",
    width: "90%",
    maxWidth: "900px",
    aspectRatio: "4/3",
    borderRadius: "20px",
    overflow: "hidden",
    background: "rgba(40,40,40,0.6)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(236,72,153,0.4)",
    boxShadow: "0 0 30px rgba(236,72,153,0.7)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  button: {
    marginTop: "30px",
    padding: "15px 40px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 0 20px rgba(236,72,153,0.8)",
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    top: 0,
    left: "-75%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
    transform: "skewX(-20deg)",
  },
  message: {
    marginTop: "20px",
    fontSize: "1.3rem",
    maxWidth: "700px",
    lineHeight: "1.6",
    color: "#fbcfe8",
    textShadow: "0 0 15px rgba(236,72,153,0.5)",
  },
  muteButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(90deg, #ec4899, #f472b6)",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    animation: "pulse 1.5s infinite",
    zIndex: 1000,
  },
  player: {
    marginTop: "25px",
    width: "80%",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  playButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  progressBar: {
    flex: 1,
    height: "8px",
    background: "#333",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#ec4899,#a855f7)",
    transition: "width 0.2s linear",
  },
};
