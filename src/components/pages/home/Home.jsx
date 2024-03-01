import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppContext from "../../../store/AppContext";

const Home = () => {
  // const { loggedIn, verifyingToken, user } = useContext(AppContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoading && loggedIn) {
  //     navigate(`/${user.role}/dashboard`);
  //   }
  // }, [loggedIn, verifyingToken]);
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Welcome to Online Examination Platform
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: "4rem" }}>
        <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to={"/admin/login"} underline="none">
            <Button variant="contained" size="large">
              Admin Login
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to={"/teacher/login"} underline="none">
            <Button variant="contained" size="large">
              Teacher Login
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to={"/student/login"} underline="none">
            <Button variant="contained" size="large">
              Student Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
