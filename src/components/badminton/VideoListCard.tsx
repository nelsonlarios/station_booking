import { Box, Button, Card, CardActions, CardContent, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Shuttlecock as ShuttlecockIcon } from "../../icons/shuttlecock";
import React from "react";
import { Program } from "@app/api/programs";
import { setStartedProgramDB } from "@app/api/startedPrograms";
import { useAuth } from "@app/hooks/use-auth";
import { useRouter } from "next/router";
import { CompletedProgram } from "@app/api/completedPrograms";
import { Technique } from "@app/api/data/techniquesData";
import { Leftfoot as LeftfootIcon } from "../../icons/left-foot";

type VideoListCardProps = {
  technique: Technique;
};

const VideoListCard = ({ technique }: VideoListCardProps) => {
  const { title, description } = technique;

  const { user } = useAuth();
  const router = useRouter();

  const minutes = "4:12";

  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <ShuttlecockIcon color="primary" fontSize="small" />
            <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            <Chip label={`Length: ${minutes}`} variant="outlined" size="small" />
          </Box>
          <Typography color="textSecondary" variant="body2">
            {description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button endIcon={<ArrowRightIcon fontSize="small" />} size="small">
            Watch
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VideoListCard;
