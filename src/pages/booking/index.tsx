import { Box, Container, Grid } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { ChangeEvent, useContext, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import BookingCard from "@app/components/badminton/BookingCard";

import Loading from "@app/components/badminton/Loading";
import { useAuth } from "@app/hooks/use-auth";

import useGetCollectionRT from "@app/api/useGetCollectionRT";
import { getStationsURL, Station } from "@app/api/stations";
import DateContext from "@app/contexts/date-context";
import useGetDocumentRT from "@app/api/useGetDocumentRT";
import { BookingDate, formatDate } from "@app/api/systemBookings";
import { getUserBookingURL } from "@app/api/userBookings";

const Booking: NextPage = () => {
  console.log("Badminton");

  const { user } = useAuth();
  const dateContext = useContext(DateContext);

  const { data: stations, loading: loadingStations } = useGetCollectionRT<Station>(getStationsURL());
  const { data: userBookings, loading: loadingUserBookings } = useGetDocumentRT<BookingDate>(
    getUserBookingURL(user?.id as any, dateContext.date)
  );

  const isLoading = loadingStations || loadingUserBookings;
  const numberOfCheckedCheckboxes = calculateInitalNumberOfCheckedCheckboxes(userBookings);

  return (
    <>
      <Head>
        <title>Invicara</title>
      </Head>

      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              {stations.map((station) => {
                return (
                  <BookingCard
                    {...{ numberOfCheckedCheckboxes, userBookings: userBookings?.[station.id] ?? [] }}
                    station={station}
                    key={station.id}
                  />
                );
              })}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

Booking.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Booking;

function calculateInitalNumberOfCheckedCheckboxes(userBookings: BookingDate | undefined) {
  let result = 0;
  if (userBookings) {
    const values = Object.values(userBookings);

    values.forEach((value) => {
      result = result + value.length;
    });
  }

  console.log({ result });

  return result;
}
