import {
  Camera,
  Lock,
  RemoveCircle,
  Shuffle,
  SwitchRightTwoTone,
} from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItemText,
  Paper,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { useContext, useEffect, useState } from "react";
import { updateExamSettings } from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";

const ListItem = styled(MuiListItem)(({}) => ({
  padding: ".25rem 0",
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  minWidth: "36px",
}));

const ExamSettings = ({ examDetails, refresh }) => {
  const [formData, setFormData] = useState(examDetails);
  const [inEditMode, setEditMode] = useState(false);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const resetState = () => {
    setFormData(examDetails);
    setEditMode(false);
  };
  const saveSettings = async () => {
    console.log(formData);
    console.log(examDetails);
    try {
      if (formData) {
        showLoader();
        await updateExamSettings(formData);
        setEditMode(false);
        refresh();
      }
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };
  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: checked });
    }
  };

  useEffect(() => {
    setFormData(examDetails);
  }, [examDetails]);

  return (
    <>
      {formData && (
        <Paper
          sx={{
            marginTop: "1rem",
            paddingX: "1rem",
            paddingY: "0.5rem",
            background: "white",
            borderRadius: "0.25rem",
          }}
        >
          <Typography variant="h6">Settings</Typography>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText primary="LockBrowser" />
              <Switch
                name="lockBrowser"
                checked={!!formData.lockBrowser}
                disabled={!inEditMode}
                onChange={handleInputChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Camera />
              </ListItemIcon>
              <ListItemText primary="Webcam" />
              <Switch
                name="webcam"
                checked={!!formData.webcam}
                disabled={!inEditMode}
                onChange={handleInputChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Shuffle />
              </ListItemIcon>
              <ListItemText primary="Shuffle Questions" />
              <Switch
                name="shuffleQuestions"
                checked={!!formData.shuffleQuestions}
                disabled={!inEditMode}
                onChange={handleInputChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <RemoveCircle />
              </ListItemIcon>
              <ListItemText primary="Negative Marking" />
              <Switch
                name="negativeMarking"
                checked={!!formData.negativeMarking}
                disabled={!inEditMode}
                onChange={handleInputChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <SwitchRightTwoTone />
              </ListItemIcon>
              <ListItemText primary="Switch between questions" />
              <Switch
                name="switchBetweenQuestions"
                checked={!!formData.switchBetweenQuestions}
                disabled={!inEditMode}
                onChange={handleInputChange}
              />
            </ListItem>
          </List>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              size="small"
              disabled={inEditMode}
              onClick={() => setEditMode(true)}
            >
              {inEditMode ? "Editing..." : "Edit"}
            </Button>
          </Box>
          {inEditMode && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                columnGap: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={resetState}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={saveSettings}
              >
                Save
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default ExamSettings;
