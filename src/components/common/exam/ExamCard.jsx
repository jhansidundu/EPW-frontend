import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import AppContext from "../../../store/AppContext";

const ValueChip = ({ text }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        paddingX: "1rem",
        paddingY: "0.25rem",
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        borderRadius: "0.5rem",
      }}
    >
      {text}
    </Typography>
  );
};

const ExamCard = ({ exam, onEnroll, onAttempt }) => {
  const examDate = dayjs(exam?.examDate).format("MMM D, YYYY h:mm a");
  const hasEnrolled = exam.status === "ENROLLED";

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{exam.name}</Typography>
        <Chip label={exam.statusLabel} />
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          "& p.label": {
            fontSize: "0.9rem",
            minWidth: "60px",
            textAlign: "right",
            margin: "0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginY: "0.25rem",
          }}
        >
          <p className="label">Begins At</p>
          <ValueChip text={examDate} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginY: "0.25rem",
          }}
        >
          <p className="label">Duration</p>
          <ValueChip text={`${exam.duration} minutes`} />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          columnGap: "1rem",
          justifyContent: "flex-end",
        }}
      >
        {/* <Button variant="contained" color="primary" size="small">
          Details
        </Button> */}
        {!hasEnrolled && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEnroll(exam.enrollmentId)}
          >
            Enroll
          </Button>
        )}

        {hasEnrolled && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAttempt(exam.examId, exam.enrollmentId)}
          >
            Attempt Now
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ExamCard;
