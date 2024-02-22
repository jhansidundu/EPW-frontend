import { Box, Typography } from "@mui/material";

const QuestionOptionCard = ({ id, option }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "1rem", alignItems: "center" }}>
      <Typography variant="subtitle1">{id})</Typography>
      <Typography variant="subtitle2">{option}</Typography>
    </Box>
  );
};

export default QuestionOptionCard;
