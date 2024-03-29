import { Logout, NotificationsOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import styles from "./Header.module.css";
import adminLogo from "../../../assets/admin-logo.png";
import teacherLogo from "../../../assets/teacher-logo.png";
import studentLogo from "../../../assets/student-male.png";
const Header = () => {
  const { user, handleLogout } = useContext(AppContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingY: "0.5rem",
        paddingX: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {user.role === "admin" && (
          <Tooltip title="Admin">
            <img
              className={styles.logo}
              src={adminLogo}
              alt="admin-settings-male"
            />
          </Tooltip>
        )}
        {user.role === "teacher" && (
          <Tooltip title="Teacher">
            <img
              className={styles.logo}
              src={teacherLogo}
              alt="external-teacher-back-to-school-itim2101-lineal-itim2101-1"
            />
          </Tooltip>
        )}
        {user.role === "student" && (
          <Tooltip title="Student">
            <img
              className={styles.logo}
              src={studentLogo}
              alt="student-female"
            />
          </Tooltip>
        )}
        <h5 style={{ margin: 0 }}>Welcome {user.username}</h5>
      </Box>
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        {/* <Tooltip title="Notifications">
          <IconButton>
            <NotificationsOutlined />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default Header;
