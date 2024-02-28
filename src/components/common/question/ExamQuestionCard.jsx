import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import parser from "html-react-parser";

const ExamQuestionCard = ({ ques, serialNum }) => {
  console.log(ques);
  return (
    <Paper
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        columnGap: "1rem",
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", columnGap: "1rem" }}
      >
        <Typography variant="caption">+{ques.marks} marks</Typography>
        {!!ques.hasNegative && (
          <Typography variant="caption">-{ques.negativePercentage}%</Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", columnGap: "1rem", alignItems: "baseline" }}>
        <Typography variant="subtitle1">Q{serialNum + 1}.</Typography>
        <Box>
          <Box
            sx={{
              "& p": {
                margin: 0,
              },
            }}
          >
            {parser(ques.question)}
          </Box>
          <RadioGroup
            sx={{ marginTop: "0.5rem" }}
            value={ques.answerOption}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <FormControlLabel
              value={"A"}
              control={<Radio />}
              label={ques.optionA}
            />
            <FormControlLabel
              value={"B"}
              control={<Radio />}
              label={ques.optionB}
            />
            <FormControlLabel
              value={"C"}
              control={<Radio />}
              label={ques.optionC}
            />
            <FormControlLabel
              value={"D"}
              control={<Radio />}
              label={ques.optionD}
            />
          </RadioGroup>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExamQuestionCard;
