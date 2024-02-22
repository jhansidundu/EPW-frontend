import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: "4rem auto",
  padding: "3rem 4rem",
  minWidth: "30%",
  maxWidth: "40%",
  [theme.breakpoints.down("md")]: {
    minWidth: "60%",
    padding: "3rem 2rem",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "90%",
    padding: "3rem 1rem",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

const StudentSignup = () => {
  return (
    <StyledBox>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Register here as a student
      </Typography>
      <form>
        <StyledTextField type="email" label="Email" size="small" fullWidth />
        <StyledTextField label="Password" size="small" fullWidth />

        <Button variant="contained" fullWidth>
          Sign up
        </Button>
        <Box sx={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link component={RouterLink} to={"/student/login"} underline="none">
            Login here
          </Link>
        </Box>
      </form>
    </StyledBox>
  );
};

export default StudentSignup;
