import { useState, useRef, useEffect } from "react";
import { useToaster } from "../context/ToastContext";

export const useMicrophone = (duration: number = 60) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(duration);

  const microphone = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const { toastError } = useToaster();

  useEffect(() => {
    if (isRecording) {
      startTimeRef.current = Date.now();
      countdownIntervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphone.current = new MediaRecorder(stream);

      microphone.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      microphone.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        const durationRecorded =
          (Date.now() - (startTimeRef.current || 0)) / 1000;
        if (durationRecorded >= 1) {
          setAudio(audioUrl);
        } else {
          toastError("Audio should be at least 4 seconds long.");
        }
        audioChunksRef.current = [];
      };

      microphone.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toastError("Failed to start recording. Please check your microphone.");
    }
  };

  const stopRecording = () => {
    if (microphone.current) {
      microphone.current.stop();
      setIsRecording(false);
      setRemainingTime(duration);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    }
  };

  const resetRecording = () => {
    if (isRecording) {
      stopRecording();
    }

    setAudio(null);
    setRemainingTime(duration);
    audioChunksRef.current = [];
    startTimeRef.current = null;
  };

  return {
    isRecording,
    audio,
    remainingTime,
    startRecording,
    stopRecording,
    resetRecording, 
  };
};
