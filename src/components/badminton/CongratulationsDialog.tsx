import { Dispatch, FC, SetStateAction, useState } from "react";
import { Avatar, Box, Button, Container, Dialog, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Celebration from "@mui/icons-material/Celebration";
import { useAuth } from "@app/hooks/use-auth";
import { useRouter } from "next/router";
import { deletedStartedProgramDB } from "@app/api/startedPrograms";
import { updateCompletedProgramDB } from "@app/api/completedPrograms";
import Loading from "./Loading";

type CongratulationsDialogProps = {
  programId: string;
  keepDialogOpenToCoverPageSoUserCantClickAnything: Dispatch<SetStateAction<boolean>>;
};

const CongratulationsDialog = ({
  programId,
  keepDialogOpenToCoverPageSoUserCantClickAnything,
}: CongratulationsDialogProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleThanks() {
    console.log("thanks");

    setLoading(true);
    keepDialogOpenToCoverPageSoUserCantClickAnything(true);
    await updateCompletedProgramDB(user?.id ?? "", programId);
    await deletedStartedProgramDB(user?.id ?? "1", programId);
    router.push("/badminton");
    setLoading(false);
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={true}
        //BackdropProps={{ style: { backgroundColor: "transparent", opacity: 1 } }}
      >
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
              <Avatar
                sx={{
                  backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
                  color: "success.main",
                  mr: 2,
                }}
              >
                <Celebration fontSize="small" />
              </Avatar>
              <div>
                <Typography variant="h5">You did it!</Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                  Congratulions for finishing the program 1!
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                px: 3,
                py: 1.5,
              }}
            >
              <Button sx={{ mr: 2 }} variant="contained" onClick={handleThanks} disabled={loading}>
                Thanks!
              </Button>
            </Box>
          </Paper>
        </Box>
      </Dialog>
    </>
  );
};

export default CongratulationsDialog;

function keepDialogOpenToCoverPageSoUserCantClickAnything(
  setIsCongratulationsDialogOpen: Dispatch<SetStateAction<boolean>>
) {
  setIsCongratulationsDialogOpen(true);
}
