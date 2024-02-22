import { DoDisturbOnOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuestionOption from "./QuestionOption";
const QuestionEditor = ({
  ques,
  onEditorChange,
  serialNum,
  onOptionChange,
  onAnsSelect,
  onDelete,
  onSave,
  onCancel,
  onSecondaryInputsChange,
  onUpdate,
}) => {
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
        columnGap: "1rem",
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      <Typography variant="subtitle1">Q{serialNum + 1}.</Typography>
      <Box>
        <ReactQuill
          value={ques.question}
          onChange={(val) => onEditorChange(serialNum, val)}
          modules={{
            toolbar: [
              // [{ font: [] }],
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["link", "image", "formula"],

              // [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              // [{ direction: "rtl" }], // text direction
              ["blockquote", "code-block"],

              // [{ size: ["small", false, "large", "huge"] }], // custom dropdown

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],

              // ["clean"],
            ],
          }}
          placeholder="Compose question"
          theme="snow"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            marginTop: "1rem",
          }}
        >
          <QuestionOption
            id="A"
            serialNum={serialNum}
            option={ques.optionA}
            correctAnswer={ques.answer === "A"}
            onAnsSelect={onAnsSelect}
            onOptionChange={onOptionChange}
          />
          <QuestionOption
            id="B"
            serialNum={serialNum}
            option={ques.optionB}
            correctAnswer={ques.answer === "B"}
            onAnsSelect={onAnsSelect}
            onOptionChange={onOptionChange}
          />
          <QuestionOption
            id="C"
            serialNum={serialNum}
            option={ques.optionC}
            correctAnswer={ques.answer === "C"}
            onAnsSelect={onAnsSelect}
            onOptionChange={onOptionChange}
          />
          <QuestionOption
            id="D"
            serialNum={serialNum}
            option={ques.optionD}
            correctAnswer={ques.answer === "D"}
            onAnsSelect={onAnsSelect}
            onOptionChange={onOptionChange}
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <Box>
            <InputLabel>Marks</InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="marks"
              value={ques.marks}
              onChange={(e) => onSecondaryInputsChange(e, serialNum)}
            />
          </Box>
          <Box>
            <InputLabel>Negative Marking</InputLabel>
            <Select
              size="small"
              fullWidth
              name="hasNegative"
              onChange={(e) => onSecondaryInputsChange(e, serialNum)}
              value={ques.hasNegative}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          </Box>
          {!!ques.hasNegative && (
            <Box>
              <InputLabel>Percentage</InputLabel>
              <Select
                size="small"
                fullWidth
                name="negativePercentage"
                onChange={(e) => onSecondaryInputsChange(e, serialNum)}
                value={ques.negativePercentage}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value={"1/4"}>25% (1/4)</MenuItem>
                <MenuItem value={"1/3"}>33% (1/3)</MenuItem>
                <MenuItem value={"1/2"}>25% (1/2)</MenuItem>
              </Select>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "1rem",
          }}
        >
          {!!ques.id && (
            <>
              <Button
                variant="contained"
                size="small"
                color="inherit"
                onClick={() => onCancel(serialNum)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onUpdate(serialNum)}
              >
                Update
              </Button>
            </>
          )}
          {!ques.id && (
            <Button
              variant="contained"
              size="small"
              onClick={() => onSave(serialNum)}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
      {isHovering && (
        <Tooltip title="Remove Question" onClick={() => onDelete(serialNum)}>
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <DoDisturbOnOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
};

export default QuestionEditor;
