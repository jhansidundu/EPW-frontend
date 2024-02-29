import { Box, Typography } from "@mui/material";
import ExamTimer from "./ExamTimer";

const ExamWindowHeader = ({ exam, onFinish }) => {
  if (!exam) {
    return <></>;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">{exam.name}</Typography>
      <ExamTimer
        startTime={exam.examDate}
        duration={exam.duration}
        onFinish={onFinish}
      />
    </Box>
  );
};

export default ExamWindowHeader;
