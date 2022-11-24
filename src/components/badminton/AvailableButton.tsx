import { BookingDate, formatDate, getSystemBookingURL } from "@app/api/systemBookings";
import useGetDocumentRT from "@app/api/useGetDocumentRT";
import DateContext from "@app/contexts/date-context";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  stationId: string;
};

const AvailableButton = ({ stationId }: Props) => {
  const dateContext = useContext(DateContext);
  const { data: systemBookings, loading: loadingSystemBookings } = useGetDocumentRT<BookingDate>(
    getSystemBookingURL(formatDate(dateContext.date))
  );

  const [available, setAvailable] = useState({ background: "green", text: "Availabe" });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentInterval = getCurrentInterval();

      if (systemBookings?.[stationId]?.includes(currentInterval)) {
        setAvailable({ background: "red", text: "Busy" });
      } else {
        setAvailable({ background: "green", text: "Availabe" });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [systemBookings, stationId]);

  const text = systemBookings?.[stationId]?.includes;
  return (
    <Button size="small">
      <span
        style={{
          borderRadius: "6px",
          display: "inline-block",
          height: "12px",
          textIndent: "-3000em",
          width: "12px",
          background: available.background,
          marginRight: "8px",
        }}
      />
      {available.text}
    </Button>
  );
};

export default AvailableButton;

function getCurrentInterval() {
  const now = new Date();

  const hours = now.getHours();
  let startHour = "";
  if (hours < 10) {
    startHour = `0${hours}`;
  } else {
    startHour = `${hours}`;
  }

  const minutes = now.getMinutes();
  let startMinute = "";
  if (minutes < 30) {
    startMinute = "00";
  } else {
    startMinute = "30";
  }

  let finishMinute = "";
  let finishHour = "";
  if (minutes < 30) {
    finishMinute = "30";
    finishHour = startHour;
  } else {
    finishMinute = "00";
    if (hours < 9) {
      finishHour = `0${hours + 1}`;
    } else {
      finishHour = `${hours + 1}`;
    }
  }

  const currentInterval = `${startHour}:${startMinute} - ${finishHour}:${finishMinute}`;

  return currentInterval;
}
