import { CheckCircle } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { verifyEmail } from "../../../../services/api/endpoints/auth.api";
import AppContext from "../../../../store/AppContext";

const TeacherEmailVerification = () => {
  const { email } = useParams();
  const [isVerified, setVerified] = useState(false);

  const [verifying, setVerifying] = useState(true);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);

  const handleVerifyEmail = async () => {
    try {
      showLoader();
      const { success } = await verifyEmail(email);
      if (success) {
        setVerified(true);

        setVerifying(false);
        alert("Account Verified");
      }
    } catch (err) {
      setVerified(false);
      setVerifying(false);
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {!!verifying && (
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          Verifying Email...
        </Typography>
      )}
      {!!isVerified && (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <CheckCircle color="success" />
          <Typography variant="subtitle1">
            Account verified successfully,{" "}
            <Link component={RouterLink} to={"/teacher/login"} underline="none">
              Login here
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TeacherEmailVerification;
