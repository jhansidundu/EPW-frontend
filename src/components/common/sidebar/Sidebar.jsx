import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import logoTitle from "../../../assets/logo-title.png";
// import logo from "../../../assets/logo.png"
import {
  Dashboard,
  Quiz,
  Settings,
  SupervisedUserCircle,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../store/AppContext";
import styles from "./Sidebar.module.css";

const StyledListItem = styled(ListItem)(({}) => ({
  padding: ".25rem 0",
}));

const StyledListItemButton = styled(ListItemButton)(({}) => ({
  "&.Mui-selected": {
    background: "#1976d2",
    borderRadius: "0.25rem",
    color: "white",
  },

  "&.Mui-selected:hover": {
    background: "#1976d2",
    opacity: "0.85",
  },

  "&.Mui-selected .MuiListItemIcon-root": {
    color: "white",
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: "36px",
}));

const Sidebar = () => {
  const { user } = useContext(AppContext);
  const [seletedItem, setSelectedItem] = useState("Dashboard");
  const navigate = useNavigate();
  const handleListItemClick = (item, redirectUrl) => {
    setSelectedItem(item);
    localStorage.setItem("selectedSidebar", item);
    navigate(redirectUrl);
  };
  useEffect(() => {
    const selectedSidebar = localStorage.getItem("selectedSidebar");
    if (selectedSidebar) setSelectedItem(selectedSidebar);
  }, []);
  return (
    <Box
      sx={{ padding: "1rem", bgcolor: "background.paper", overflow: "auto" }}
    >
      <div onClick={() => navigate(`/${user.role}/dashboard`)}>
        <img src={logoTitle} alt="Pareeksha" className={styles.logo} />
      </div>
      <List>
        {user.role === "admin" && (
          <>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Dashboard"}
                onClick={() =>
                  handleListItemClick("Dashboard", "/admin/dashboard")
                }
              >
                <StyledListItemIcon>
                  <Dashboard />
                </StyledListItemIcon>
                <ListItemText primary="Dashboard" />
              </StyledListItemButton>
            </StyledListItem>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Exams"}
                onClick={() => handleListItemClick("Exams", "/admin/exams")}
              >
                <StyledListItemIcon>
                  <Quiz />
                </StyledListItemIcon>
                <ListItemText primary="Exams" />
              </StyledListItemButton>
            </StyledListItem>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Users"}
                onClick={() => handleListItemClick("Users", "/admin/users")}
              >
                <StyledListItemIcon>
                  <SupervisedUserCircle />
                </StyledListItemIcon>
                <ListItemText primary="Users" />
              </StyledListItemButton>
            </StyledListItem>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Settings"}
                onClick={() =>
                  handleListItemClick("Settings", "/admin/settings")
                }
              >
                <StyledListItemIcon>
                  <Settings />
                </StyledListItemIcon>
                <ListItemText primary="Settings" />
              </StyledListItemButton>
            </StyledListItem>
          </>
        )}
        {user.role === "teacher" && (
          <>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Dashboard"}
                onClick={() =>
                  handleListItemClick("Dashboard", "/teacher/dashboard")
                }
              >
                <StyledListItemIcon>
                  <Dashboard />
                </StyledListItemIcon>
                <ListItemText primary="Dashboard" />
              </StyledListItemButton>
            </StyledListItem>
            <StyledListItem disableGutters>
              <StyledListItemButton
                selected={seletedItem === "Exams"}
                onClick={() => handleListItemClick("Exams", "/teacher/exams")}
              >
                <StyledListItemIcon>
                  <Quiz />
                </StyledListItemIcon>
                <ListItemText primary="Exams" />
              </StyledListItemButton>
            </StyledListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
