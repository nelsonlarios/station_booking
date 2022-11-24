import type { FC } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, Box, Button, Divider, FormHelperText, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const FirebaseLogin: FC = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth() as any;
  const formik = useFormik({
    initialValues: {
      email: "nelson.larios.developer@gmail.com",
      password: "99320533",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);

        if (isMounted()) {
          const returnUrl = "/booking";
          //const returnUrl = (router.query.returnUrl as string) || "/bokking";
          router.push(returnUrl);
        }
      } catch (err: any) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleGoogleClick = async (): Promise<void> => {
    console.log("before google");
    console.log({ signInWithGoogle });

    try {
      await signInWithGoogle();

      if (isMounted()) {
        const returnUrl = "/booking";
        console.log({ returnUrl });

        //const returnUrl = (router.query.returnUrl as string) || "/badminton";
        router.push(returnUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div {...props}>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          backgroundColor: "common.white",
          color: "common.black",
          "&:hover": {
            backgroundColor: "common.white",
            color: "common.black",
          },
        }}
        variant="contained"
      >
        <Box alt="Google" component="img" src="/static/icons/google.svg" sx={{ mr: 1 }} />
        Google
      </Button>
    </div>
  );
};
