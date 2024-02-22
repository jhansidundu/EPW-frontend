import { Grid } from "@mui/material";

const AllExams = () => {
  return (
    <Grid container>
      <Grid item md={8}>
        Exams
      </Grid>
      <Grid item md={4}>
        Exam Settings
      </Grid>
    </Grid>
  );
};

export default AllExams;
