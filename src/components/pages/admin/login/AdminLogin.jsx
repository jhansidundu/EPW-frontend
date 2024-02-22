import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login } from "../../../../services/api/endpoints/auth.api";
import AppContext from "../../../../store/AppContext";

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

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
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
      const authRes = await login(formData);
      setLoginState(authRes.data);
      navigate("/admin/dashboard");
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
    }
  };
  return (
    <StyledBox>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Admin Login
      </Typography>
      <form>
        <StyledTextField
          type="email"
          label="Email"
          size="small"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <StyledTextField
          type="password"
          label="Password"
          size="small"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
        />
        <Box
          sx={{
            marginBottom: "0.5rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link underline="none" component={RouterLink} to={"/forgot-password"}>
            Forgot Password?
          </Link>
        </Box>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </StyledBox>
  );
};

export default AdminLogin;
