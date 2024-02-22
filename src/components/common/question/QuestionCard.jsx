import { DoDisturbOnOutlined, Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import parser from "html-react-parser";
import { useState } from "react";
import QuestionOptionCard from "./QuestionOptionCard";
const QuestionCard = ({ ques, serialNum, onSwithToEdit, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Paper
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
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
        sx={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}
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
          <Box sx={{ marginTop: "0.5rem" }}>
            <QuestionOptionCard id={"A"} option={ques.optionA} />
            <QuestionOptionCard id={"B"} option={ques.optionB} />
            <QuestionOptionCard id={"C"} option={ques.optionC} />
            <QuestionOptionCard id={"D"} option={ques.optionD} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "0.5rem" }}>
        <Typography variant="subtitle1" color={"green"}>
          Correct Answer: {ques.answer}
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        {isHovering && (
          <>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onSwithToEdit(serialNum)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => onDelete(serialNum)}>
                <DoDisturbOnOutlined />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default QuestionCard;
