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
  Grid,
  InputLabel,
  List,
  ListItemText,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useRef, useState } from "react";
import { createExam } from "../../../../services/api/endpoints/exam.api";
import AppContext from "../../../../store/AppContext";

const ListItem = styled(MuiListItem)(({}) => ({
  padding: ".25rem 0",
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  minWidth: "36px",
}));
const AddExam = () => {
  const [examData, setExamData] = useState({
    name: "",
    examDate: "",
    duration: 30,
    totalQuestions: 0,
    lockBrowser: true,
    webcam: false,
    shuffleQuestions: true,
    negativeMarking: false,
    switchBetweenQuestions: true,
  });
  const examDateRef = useRef(null);
  const examTimeRef = useRef(null);
  const { showLoader, hideLoader, handleAPIError } = useContext(AppContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setExamData({ ...examData, [name]: checked });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...examData };
      if (examDateRef.current && examTimeRef.current) {
        const examDate = examDateRef.current.value;
        const examTime = examTimeRef.current.value;
        if (examDate && examTime) {
          payload.examDate = dayjs(
            `${examDate} ${examTime}`,
            "MM/DD/YYYY hh:mm A"
          ).toISOString();
        }
      }
      showLoader();
      const response = await createExam(payload);
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Grid container sx={{ marginX: "1rem" }}>
        <Grid item md={8}>
          <Typography variant="h6">Add Exam details</Typography>

          <Grid container spacing={2}>
            <Grid item md={9} sx={{ marginTop: "0.5rem" }}>
              <InputLabel>Exam Name</InputLabel>
              <TextField
                fullWidth
                size="small"
                name="name"
                value={examData.name}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: "0.25rem" }}>
            <Grid item md={3}>
              <InputLabel>Exam Date</InputLabel>
              <MobileDatePicker sx={{ width: "100%" }} inputRef={examDateRef} />
            </Grid>
            <Grid item md={3}>
              <InputLabel>Exam Time</InputLabel>
              <MobileTimePicker sx={{ width: "100%" }} inputRef={examTimeRef} />
            </Grid>
            <Grid item md={4}>
              <InputLabel>Duration (in min.)</InputLabel>
              <TextField
                name="duration"
                type="number"
                value={examData.duration}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: "0.25rem" }}>
            <Grid item md={3}>
              <InputLabel>Number of Questions</InputLabel>
              <TextField
                type="number"
                size="small"
                fullWidth
                name="totalQuestions"
                value={examData.totalQuestions}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6">Settings</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText primary="LockBrowser" />
              <Switch
                name="lockBrowser"
                checked={examData.lockBrowser}
                onChange={handleSwitchChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Camera />
              </ListItemIcon>
              <ListItemText primary="Webcam" />
              <Switch
                name="webcam"
                checked={examData.webcam}
                onChange={handleSwitchChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Shuffle />
              </ListItemIcon>
              <ListItemText primary="Shuffle Questions" />
              <Switch
                name="shuffleQuestions"
                checked={examData.shuffleQuestions}
                onChange={handleSwitchChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <RemoveCircle />
              </ListItemIcon>
              <ListItemText primary="Negative Marking" />
              <Switch
                name="negativeMarking"
                checked={examData.negativeMarking}
                onChange={handleSwitchChange}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <SwitchRightTwoTone />
              </ListItemIcon>
              <ListItemText primary="Switch between questions" />
              <Switch
                name="switchBetweenQuestions"
                checked={examData.switchBetweenQuestions}
                onChange={handleSwitchChange}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container sx={{ margin: "1rem" }}>
        <Grid item md={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Create Exam
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddExam;
