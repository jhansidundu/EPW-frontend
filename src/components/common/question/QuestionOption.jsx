import { Done } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";

const QuestionOption = ({
  id,
  serialNum,
  option,
  correctAnswer,
  onAnsSelect,
  onOptionChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "normal",
        justifyContent: "center",
        columnGap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1">{id}</Typography>
      </Box>
      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        onChange={(e) => onOptionChange(e, serialNum, id)}
        value={option}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<Done />}
        color={correctAnswer ? "primary" : "inherit"}
        onClick={() => onAnsSelect(serialNum, id)}
      ></Button>
    </Box>
  );
};

export default QuestionOption;
