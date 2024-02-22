import { Box, Button, Chip, Grid, Skeleton, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../store/AppContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../accordian/Accordian";

const ExamAccordian = ({ expanded, onToggle, exam, examDetails }) => {
  const { examStatusList } = useContext(AppContext);
  const examDate = dayjs(examDetails?.examDate).format("MMM D, YYYY, h:mm a");
  const examStatus = examStatusList.find((s) => s.id === exam?.status);
  const navigate = useNavigate();
  return (
    <Accordion expanded={expanded} onChange={() => onToggle(exam.id)}>
      <AccordionSummary>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ display: "inline", marginRight: "1rem" }}
          >
            {exam.name}
          </Typography>
          <Chip label={examStatus?.label} color="default" size="small" />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {!examDetails && (
          <Box
            sx={{
              color: "grey",
              fontSize: "0.9rem",
            }}
          >
            <p>Exam Instructions</p>
            <Grid container>
              <Grid item md={6}>
                <Box sx={{ display: "flex" }}>
                  <p>Exam Name:</p>
                  <Skeleton
                    animation="wave"
                    sx={{ flexGrow: "0.5", marginLeft: "0.5rem" }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex" }}>
                  <p>Exam Date:</p>
                  <Skeleton
                    animation="wave"
                    sx={{ flexGrow: "0.5", marginLeft: "0.5rem" }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex" }}>
                  <p>Duration:</p>
                  <Skeleton
                    animation="wave"
                    sx={{ flexGrow: "0.5", marginLeft: "0.5rem" }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex" }}>
                  <p>Total Questions:</p>
                  <Skeleton
                    animation="wave"
                    sx={{ flexGrow: "0.5", marginLeft: "0.5rem" }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Skeleton
                sx={{ marginX: "0.5rem" }}
                variant="rectangular"
                width={150}
                height={40}
              />
              <Skeleton
                sx={{ marginX: "0.5rem" }}
                variant="rectangular"
                width={150}
                height={40}
              />
              <Skeleton
                sx={{ marginX: "0.5rem" }}
                variant="rectangular"
                width={150}
                height={40}
              />
            </Box>
          </Box>
        )}
        {examDetails && (
          <Box
            sx={{
              color: "grey",
              fontSize: "0.9rem",
            }}
          >
            <Typography variant="subtitle1" sx={{ paddingY: "0.5rem" }}>
              Exam Instructions
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                    Exam Name:
                  </Typography>
                  <Typography sx={{ marginLeft: "0.5rem" }} variant="subtitle2">
                    {examDetails.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                    Exam Date:
                  </Typography>
                  <Typography sx={{ marginLeft: "0.5rem" }} variant="subtitle2">
                    {examDate}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                    Duration:
                  </Typography>
                  <Typography
                    sx={{ marginLeft: "0.5rem" }}
                    variant="subtitle2"
                  >{`${examDetails.duration} min`}</Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                    Total Questions:
                  </Typography>
                  <Typography sx={{ marginLeft: "0.5rem" }} variant="subtitle2">
                    {examDetails.totalQuestions}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ marginX: "0.5rem" }}
                onClick={() => navigate(`/teacher/exams/${exam.id}/questions`)}
              >
                Show Questions
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ marginX: "0.5rem" }}
                onClick={() => navigate(`/teacher/exams/${exam.id}/enroll`)}
              >
                Enroll Students
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ marginX: "0.5rem" }}
              >
                Exam Report
              </Button>
            </Box>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ExamAccordian;
