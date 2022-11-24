/* eslint-disable @next/next/no-img-element */
import { useContext, useRef, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { AppBar, Avatar, Box, ButtonBase, IconButton, TextField, Toolbar, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material";
import { Menu as MenuIcon } from "../../icons/menu";
import { AccountPopover } from "./account-popover";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { useAuth } from "@app/hooks/use-auth";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import DateContext from "@app/contexts/date-context";

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <img alt="" src={user?.avatar} referrerPolicy="no-referrer" style={{ display: "none" }} />
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={user?.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const dateContext = useContext(DateContext);
  console.log(dateContext.date);

  const { onOpenSidebar, ...other } = props;

  var fiveDaysAhead = new Date();
  var numberOfDaysToAdd = 5;
  fiveDaysAhead.setDate(fiveDaysAhead.getDate() + numberOfDaysToAdd);
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 0,
          },
          width: {
            lg: "calc(100% )",
          },
          pt: 2,
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <DesktopDatePicker
            label="Choose your date and time slot:"
            maxDate={fiveDaysAhead}
            minDate={new Date()}
            inputFormat="dd/MM/yyyy"
            value={dateContext.date}
            onChange={(newDate) => {
              console.log(newDate);
              dateContext.setDate(newDate as Date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
