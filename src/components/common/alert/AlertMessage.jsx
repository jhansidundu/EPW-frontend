import { Alert } from "@mui/material";

const AlertMessage = () => {
  return (
    <Alert severity="warning" onClose={() => {}}>
      This Alert displays the default close icon.
    </Alert>
  );
};

export default AlertMessage;
