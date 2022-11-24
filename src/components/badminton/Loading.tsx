import { LinearProgress } from "@mui/material";
import React from "react";

type Props = {
  loading: boolean;
};

const Loading = ({ loading }: Props) => {
  return <>{loading && <LinearProgress color="primary" />}</>;
};

export default Loading;
