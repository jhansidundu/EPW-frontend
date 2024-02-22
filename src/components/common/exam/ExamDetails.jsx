import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import dayjs from "dayjs";

const Exam = ({ exam }) => {
  const examDate = dayjs(exam?.examDate).format("MMM D, YYYY, h:mm a");
  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="subtitle1">Exam Details</Typography>
      <Box sx={{ marginTop: "1rem", color: "grey", fontSize: "0.9rem" }}>
        {!exam && (
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
        )}
        {!!exam && (
          <Grid container>
            <Grid item md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                  Exam Name:
                </Typography>
                <Typography sx={{ marginLeft: "0.5rem" }} variant="subtitle2">
                  {exam.name}
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
                >{`${exam.duration} min`}</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ paddingY: "0.5rem" }} variant="subtitle2">
                  Total Questions:
                </Typography>
                <Typography sx={{ marginLeft: "0.5rem" }} variant="subtitle2">
                  {exam.totalQuestions}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default Exam;
