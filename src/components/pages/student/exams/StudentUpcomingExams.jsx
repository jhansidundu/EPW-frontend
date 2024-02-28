import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  completeStudentEnrollment,
  findStudentEnrollments,
} from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";
import ExamCard from "../../../common/exam/ExamCard";

export const StudentUpcomingExams = () => {
  const [exams, setExams] = useState([]);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

  const getUpcomingExams = async () => {
    try {
      showLoader();
      const res = await findStudentEnrollments();
      setExams(res.data);
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getUpcomingExams();
  }, []);
  if (!exams || exams.length === 0) {
    return <></>;
  }
  const handleEnroll = async (enrollmentId) => {
    try {
      showLoader();
      await completeStudentEnrollment({ enrollmentId });
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Upcoming Exams</Typography>
      </Box>
      <Grid container sx={{ marginTop: "1rem" }}>
        {exams.map((exam) => {
          return (
            <Grid key={exam.enrollmentId} item md={4}>
              <ExamCard exam={exam} onEnroll={handleEnroll} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default StudentUpcomingExams;
