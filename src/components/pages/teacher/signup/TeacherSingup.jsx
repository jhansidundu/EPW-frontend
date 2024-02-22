import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import teacherLogo from "../../../../assets/teacher.png";
import { signup } from "../../../../services/api/endpoints/auth.api";
import AppContext from "../../../../store/AppContext";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: "4rem auto",
  padding: "3rem 0rem",
  minWidth: "40%",
  maxWidth: "60%",
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

const TeacherSingup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "teacher",
  });
  const navigate = useNavigate();

  const { showLoader, hideLoader, handleAPIError, setLoginState } =
    useContext(AppContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      showLoader();
      const authRes = await signup(formData);
      setLoginState(authRes.data);
      navigate("/teacher/dashboard");
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };
  return (
    <Grid container>
      <Grid
        item
        md={3}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <img src={teacherLogo} alt="" />
      </Grid>

      <Grid item md={9}>
        <StyledBox>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Register here as a teacher
          </Typography>
          <form>
            <StyledTextField
              type="text"
              label="Username"
              size="small"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <StyledTextField
              type="email"
              label="Email"
              size="small"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <StyledTextField
              type="password"
              label="Password"
              size="small"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Button
              variant="contained"
              type="button"
              fullWidth
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            <Box sx={{ marginTop: "1rem" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to={"/teacher/login"}
                underline="none"
              >
                Login here
              </Link>
            </Box>
          </form>
        </StyledBox>
      </Grid>
    </Grid>
  );
};

export default TeacherSingup;
