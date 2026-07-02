import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // speed per character in ms
  delay?: number; // delay before starting in ms
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 40,
  delay = 0,
  className = '',
  showCursor = true
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && started && displayedText.length < text.length && (
        <span className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}
