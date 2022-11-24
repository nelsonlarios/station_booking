import {
  BookingDate,
  deleteSystemBooking,
  formatDate,
  getSystemBookingURL,
  setSystemBooking,
} from "@app/api/systemBookings";
import useGetCollectionRT from "@app/api/useGetCollectionRT";
import useGetDocumentRT from "@app/api/useGetDocumentRT";
import { deleteUserBooking, setUserBooking } from "@app/api/userBookings";
import DateContext from "@app/contexts/date-context";
import { useAuth } from "@app/hooks/use-auth";
import { FormGroup } from "@mui/material";
import React, { ChangeEvent, useContext } from "react";
import DateCheckbox from "./DateCheckbox";

type Props = {
  numberOfCheckedCheckboxes: number;
  stationId: keyof BookingDate;
  userBookings: string[];
};

const DateCheckboxFormGroup = ({ numberOfCheckedCheckboxes, stationId, userBookings }: Props) => {
  const { user } = useAuth();
  const dateContext = useContext(DateContext);

  const { data: systemBookings, loading: loadingSystemBookings } = useGetDocumentRT<BookingDate>(
    getSystemBookingURL(formatDate(dateContext.date))
  );

  const handleOnCheck = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setUserBooking(user!.id, dateContext.date, stationId, event.target.value);
      setSystemBooking(dateContext.date, stationId, event.target.value);
    } else {
      deleteUserBooking(user!.id, dateContext.date, stationId, event.target.value);
      deleteSystemBooking(dateContext.date, stationId, event.target.value);
    }
  };

  const disabled = numberOfCheckedCheckboxes === 3;

  console.log({ stationId });

  console.log({ userBookings });

  return (
    <>
      <FormGroup sx={{ pl: 1, mt: 2 }}>
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "08:00 - 08:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "08:30 - 09:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "09:00 - 09:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "09:30 - 10:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "10:00 - 10:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "10:30 - 11:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "11:00 - 11:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "11:30 - 12:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "12:00 - 12:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "12:30 - 13:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "13:00 - 13:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "13:30 - 14:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "14:00 - 14:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "14:30 - 15:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "15:00 - 15:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "15:30 - 16:00", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "16:00 - 16:30", handleOnCheck)}
        {generateDateCheckBox(systemBookings, userBookings, disabled, stationId, "16:30 - 17:00", handleOnCheck)}
      </FormGroup>
    </>
  );
};

export default DateCheckboxFormGroup;

function generateProps(
  systemBookings: BookingDate,
  userBookings: string[],
  disabled: boolean,
  stationId: string,
  time: string
) {
  return {
    disabled: userBookings?.includes(time) ? false : disabled || systemBookings?.[stationId]?.includes(time),
    lineThrough: systemBookings?.[stationId]?.includes(time) && !userBookings?.includes(time),
    checked: userBookings?.includes(time) ?? false,
  };
}

function generateDateCheckBox(
  systemBookings: BookingDate,
  userBookings: string[],
  disabled: boolean,
  stationId: string,
  time: string,
  handleOnCheck: (event: ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <DateCheckbox
      {...{
        onCheck: handleOnCheck,
        ...generateProps(systemBookings, userBookings, disabled, stationId, time),
      }}
    >
      {time}
    </DateCheckbox>
  );
}
