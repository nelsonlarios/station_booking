import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { OverviewBanner } from "../../components/dashboard/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/dashboard/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/dashboard/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/dashboard/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/dashboard/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/dashboard/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/dashboard/overview/overview-total-transactions";
import TerminalIcon from "@mui/icons-material/Terminal";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Reports as ReportsIcon } from "../../icons/reports";
import { Users as UsersIcon } from "../../icons/users";
import { gtm } from "../../lib/gtm";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const Overview: NextPage = () => {
  const [displayBanner, setDisplayBanner] = useState<boolean>(true);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>Lets React - Setup</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Overview</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <PriorityHighIcon color="primary" fontSize="small" />
                    <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                      Prerequisites
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Created by a developer for developers
                  </Typography>
                  <Typography color="textSecondary" variant="inherit">
                    <br />
                    This course assumes you are already a software developer, so even though there is an overview of the
                    most important aspects of JavaScript, this is not a JavaScript course.
                    <br />
                    That said, even if JavaScript is not your main language I&#39;m positive you&#39;ll be able to
                    follow the course given that JavaScript syntax is simple and very similar to other languages you
                    already know.
                    <br />
                    So you can trust me and jump aboard of the React boat and we&#39;ll sail towards a beautiful UI
                    island, hopefully with good weather along the way, but then again we are in the UK.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <TerminalIcon color="primary" fontSize="small" />
                    <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                      System Requirements
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Preparing your environment
                  </Typography>
                  <Typography color="textSecondary" variant="inherit">
                    <br />
                    <Link href="https://git-scm.com/">git</Link> v2.13 or greater
                    <br />
                    <Link href="https://nodejs.org/en/">NodeJS</Link> 14 || 16 || 18
                    <br />
                    <Link href="https://www.npmjs.com/">npm</Link> v8.16.0 or greater
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="medium">
                    It might work with older versions, these are just the ones I&#39;m using
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <SettingsApplicationsIcon color="primary" fontSize="small" />
                    <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                      Setup
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Repositories and IDE
                  </Typography>
                  <Typography color="textSecondary" variant="inherit">
                    <br />
                    <Link href="https://code.visualstudio.com/download">Visual Studio Code</Link> On the videos I am
                    using Visual Studio Code, but feel free to use anything else.
                    <br />
                    <Link href="https://github.com/nelsonlarios/lets-react-001">Let&#39;s react 001 repo</Link> -
                    https://github.com/nelsonlarios/lets-react-001
                    <br />
                    <Link href="https://github.com/nelsonlarios/lets-react-002">Let&#39;s react 002 repo</Link> -
                    https://github.com/nelsonlarios/lets-react-002
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <DirectionsRunIcon color="primary" fontSize="small" />
                    <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                      Runnings the Apps
                    </Typography>
                  </Box>

                  <Typography color="textSecondary" variant="inherit">
                    <br />
                    For the first part of the course (001 - Must Know JS For React), you just need to run{" "}
                    <code>npm install</code> and then <code>npm test</code>
                    <br />
                    For the second part of the course (002 - React Fundamentls), you just need to run{" "}
                    <code>npm install</code>, <code>npm start</code> will start the application on{" "}
                    <code>http://localhost:3000/</code> and then <code>npm test</code>, for the exercises in the JS
                    files.
                  </Typography>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
