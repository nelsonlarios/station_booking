import React from "react";
//import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("should show when passed parameter is TRUE", () => {
    render(<Loading loading={true} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("should NOT show when passed parameter is FALSE", () => {
    render(<Loading loading={false} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
