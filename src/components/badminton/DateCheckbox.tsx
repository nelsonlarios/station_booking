import { setUserBooking } from "@app/api/userBookings";
import { useAuth } from "@app/hooks/use-auth";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { ChangeEvent, ReactNode } from "react";

type Props = {
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children: ReactNode;
  lineThrough?: boolean;
  checked?: boolean;
};

const DateCheckbox = ({ children, onCheck, disabled, lineThrough, checked }: Props) => {
  const { user } = useAuth();

  return (
    <FormControlLabel
      control={<Checkbox onChange={onCheck} disabled={disabled} value={children} checked={checked} />}
      label={
        <Typography variant="body1" sx={lineThrough ? { textDecoration: "line-through" } : {}}>
          {children}
        </Typography>
      }
    />
  );
};

export default DateCheckbox;
