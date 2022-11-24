import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import ComputerIcon from "@mui/icons-material/Computer";
import React, { ChangeEvent, useState } from "react";
import { Program } from "@app/api/programs";
import { setStartedProgramDB } from "@app/api/startedPrograms";
import { useAuth } from "@app/hooks/use-auth";
import { useRouter } from "next/router";
import { CompletedProgram } from "@app/api/completedPrograms";
import BookingDialog from "./BookingDialog";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateCheckbox from "./DateCheckbox";
import DateCheckboxFormGroup from "./DateCheckboxFormGroup";
import AvailableButton from "./AvailableButton";
import { Station } from "@app/api/stations";

type BookingCardProps = {
  station: Station;
  numberOfCheckedCheckboxes: number;
  userBookings: string[];
};

const BookingCard = ({ station, numberOfCheckedCheckboxes, userBookings }: BookingCardProps) => {
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <ComputerIcon color="primary" fontSize="small" />
            <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
              {station.name}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              mb: 1,
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: "background.default",
              minHeight: "100%",
              p: 1,
            }}
          >
            <Paper elevation={12}>
              <Box
                sx={{
                  display: "flex",
                  pb: 2,
                  pt: 3,
                  px: 3,
                }}
              >
                <div>
                  <DateCheckboxFormGroup {...{ numberOfCheckedCheckboxes, userBookings, stationId: station.id }} />
                </div>
              </Box>
            </Paper>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <AvailableButton {...{ stationId: station.id }} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookingCard;
