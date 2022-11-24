import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

type Variant = "light" | "primary";

interface LogoProps {
  variant?: Variant;
}

export const Logo = styled((props: LogoProps) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#C1C4D6" : "#5048E5";

  return <img alt="" src="/static/invicara.png" width="50%" style={{ marginLeft: "120px" }} />;
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf<Variant>(["light", "primary"]),
};
