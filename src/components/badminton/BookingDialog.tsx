import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Celebration from "@mui/icons-material/Celebration";
import { useAuth } from "@app/hooks/use-auth";
import { useRouter } from "next/router";
import { deletedStartedProgramDB } from "@app/api/startedPrograms";
import { updateCompletedProgramDB } from "@app/api/completedPrograms";
import Loading from "./Loading";
import { DesktopDatePicker } from "@mui/lab";
import DateCheckbox from "./DateCheckbox";

type CongratulationsDialogProps = {
  // programId: string;
  // keepDialogOpenToCoverPageSoUserCantClickAnything: Dispatch<SetStateAction<boolean>>;
};

const BookingDialog = ({}: CongratulationsDialogProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  async function handleThanks() {
    console.log("thanks");
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={false}
        scroll="paper"
        BackdropProps={{
          style: { backgroundColor: "transparent", opacity: 1 },
        }}
      >
        <DialogContent dividers={true}>
          <Box
            sx={{
              backgroundColor: "background.default",
              minHeight: "100%",
              p: 1,
            }}
          >
            <Paper elevation={12}>
              <Loading loading={loading} />
              <Box
                sx={{
                  display: "flex",
                  pb: 2,
                  pt: 3,
                  px: 3,
                }}
              >
                <div>
                  <DesktopDatePicker
                    label="Choose your date and time slot:"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate as Date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {/* <FormGroup sx={{ pl: 1, mt: 2 }}>
                    <DateCheckbox>08:00 - 08:30</DateCheckbox>
                    <DateCheckbox>08:00 - 08:30</DateCheckbox>
                    <DateCheckbox>08:30 - 09:00</DateCheckbox>
                    <DateCheckbox>09:00 - 09:30</DateCheckbox>
                    <DateCheckbox>09:30 - 10:00</DateCheckbox>
                    <DateCheckbox>10:00 - 10:30</DateCheckbox>
                    <DateCheckbox>10:30 - 11:00</DateCheckbox>
                    <DateCheckbox>11:00 - 11:30</DateCheckbox>
                    <DateCheckbox>11:30 - 12:00</DateCheckbox>
                    <DateCheckbox>12:00 - 12:30</DateCheckbox>
                    <DateCheckbox>13:00 - 13:30</DateCheckbox>
                    <DateCheckbox>14:00 - 14:30</DateCheckbox>
                    <DateCheckbox>15:00 - 15:30</DateCheckbox>
                    <DateCheckbox>16:00 - 16:30</DateCheckbox>
                    <DateCheckbox>16:30 - 17:00</DateCheckbox>
                  </FormGroup> */}
                </div>
              </Box>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box>
            <Button sx={{ mr: 2 }} variant="contained" onClick={handleThanks} disabled={loading}>
              Book!
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingDialog;

function keepDialogOpenToCoverPageSoUserCantClickAnything(
  setIsCongratulationsDialogOpen: Dispatch<SetStateAction<boolean>>
) {
  setIsCongratulationsDialogOpen(true);
}
