import { AccessTime } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

const ExamTimer = ({ startTime, duration, onFinish }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime()); // Convert duration to seconds
  function getRemainingTime() {
    const currentTime = Math.round(new Date().getTime() / 1000);
    const start = Math.round(new Date(startTime).getTime() / 1000);
    const remainingTime = start + duration * 60 - currentTime;
    return remainingTime;
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(intervalId);
        onFinish();
      }
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  const getTimeString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    // Format time string with leading zeros
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`;
  };

  return (
    <Box>
      <Chip
        icon={<AccessTime />}
        color="info"
        label={getTimeString(remainingTime)}
      ></Chip>
    </Box>
  );
};

export default ExamTimer;
