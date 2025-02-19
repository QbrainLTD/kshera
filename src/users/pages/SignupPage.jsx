import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/signupSchema";
import { Container } from "@mui/material";
import SignupForm from "../components/SignupForm";
import useUsers from "../hooks/useUsers";


export default function SignupPage() {
  const { handleSignup, error } = useUsers();


  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const { user } = useCurrentUser();

  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  console.log(error)

  return (
    <Container
      sx={{
        paddingTop: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:"90vh"
      }}
    >
      <SignupForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"register form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        handleChangeCheckBox={handleChangeCheckBox}
      />
    </Container>
  );
}