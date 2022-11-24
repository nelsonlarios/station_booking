import { programs } from "@app/api/programs";
import { AuthContext, State } from "@app/contexts/firebase-auth-context";
import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import BookingCard from "./BookingCard";
import * as nextRouter from "next/router";

import * as startedPrograms from "@app/api/startedPrograms";

describe("ProgramCard", () => {
  test("Should render data properly", () => {
    const program = programs[0];
    renderWithAuthContext(<BookingCard program={program} isContinue={false} />);
    expect(screen.getByText("Program 1")).toBeInTheDocument();
    expect(screen.getByText("Minutes: 25")).toBeInTheDocument();
    expect(screen.getByText("Shuttles: 455")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fundamental exercises with long sets, focusing on speed and shot quality. A good introduction to multifeed training."
      )
    ).toBeInTheDocument();
  });

  test("should show Start when isContinue is false and call setStartedProgramDB when Start is clicked", () => {
    const setStartedProgramDBMock = jest.spyOn(startedPrograms, "setStartedProgramDB").mockImplementation(jest.fn());

    const program = programs[0];
    renderWithAuthContext(<BookingCard program={program} isContinue={false} />);

    const startButton = screen.getByText("Start");
    expect(startButton).toBeInTheDocument();
    expect(screen.queryByText("Continue")).not.toBeInTheDocument();

    fireEvent.click(startButton);
    expect(setStartedProgramDBMock).toHaveBeenCalledWith("test-id", "program_1");
  });

  test("should show Continue when isContinue is true and does not and call setStartedProgramDB when Continue is clicked ", () => {
    const program = programs[0];
    renderWithAuthContext(<BookingCard program={program} isContinue={true} />);
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.queryByText("Start")).not.toBeInTheDocument();
  });
});

const authMock = {
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  signInWithGoogle: jest.fn(() => Promise.resolve(true)),
  logout: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => {
    Promise.resolve(true);
  }),
  onAuthStateChanged: jest.fn(),
  currentUser: {
    sendEmailVerification: jest.fn(() => Promise.resolve(true)),
  },
};

const state: State = {
  isInitialized: true,
  isAuthenticated: true,
  user: { id: "test-id", avatar: "test-avatar", email: "test-email", name: "test-name" },
};

function renderWithAuthContext(children: ReactNode): RenderResult {
  const push = jest.fn();
  jest.spyOn(nextRouter, "useRouter").mockReturnValue({
    asPath: "/",
    push,
  } as any);

  const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, logout } = authMock;
  return render(
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
