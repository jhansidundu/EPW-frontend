import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../../../store/AppContext";
import { completeStudentAutoEnrollment } from "../../../../services/api/endpoints/exam.api";
import { Box, Typography } from "@mui/material";

const StudentEnrollment = () => {
  const { enrollmentId } = useParams();
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

  const checkEnrollmentStatus = async () => {
    try {
      showLoader();
      const res = await completeStudentAutoEnrollment({ enrollmentId });
      if (!res.success) {
        // if ()
      } else {
      }
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    checkEnrollmentStatus();
  }, []);

  return (
    <Box>
      <Typography variant="subtitle2">Please wait...</Typography>
    </Box>
  );
};
export default StudentEnrollment;
