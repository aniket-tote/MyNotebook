import { Box, Button, CircularProgress, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    }
    return error;
  }
  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }
  function validatecPassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  useEffect(() => {
    if (
      localStorage.getItem("token")
    ) {
      navigate("/");
    }
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      height={"calc(100vh - 4rem)"}
      paddingY={"28"}
    >
      <Text fontSize='3xl' marginBottom={5}>
        {searchParams.get("token")
          ? "Reset Your Password"
          : "Confirm your email"}
      </Text>
      {searchParams.get("token") ? (

        <Formik
          initialValues={{ password: "", cpassword: "" }}
          onSubmit={async (values, actions) => {
            if (values.password !== values.cpassword) {
              toast({
                title: "Password do not match",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
              });
            } else {
              const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/auth/reset-password`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: searchParams.get("id"),
                    password: values.password.trim(),
                    token: searchParams.get("token"),
                  }),
                }
              );
              const resData = await response.json();

              if (resData.success) {
                values.password = ""
                values.cpassword = ""
                toast({
                  title: "Password Updated",
                  status: "success",
                  position: "top",
                  duration: 2000,
                  isClosable: true,
                });
                navigate("/login");
              } else {
                toast({
                  title: resData.message.toString(),
                  status: "error",
                  position: "top",
                  duration: 2000,
                  isClosable: true,
                });
              }
            }
          }}
        >
          {(props) => (
            <Form>
              <Field name="password" validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <Input
                      {...field}
                      placeholder="Password"
                      type={"password"}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box width={"100%"} height={5} />
              <Field name="cpassword" validate={validatecPassword}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.cpassword && form.touched.cpassword}
                  >
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type={"password"}
                    />
                    <FormErrorMessage>{form.errors.cpassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box width={"100%"} height={2} />
              <Button
                mt={4}
                width={"100%"}
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, actions) => {
            const response = await fetch(
              `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/auth/forgot-password`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                }),
              }
            );

            const resData = await response.json();

            if (resData.success) {
              values.email = "";
              toast({
                title: resData.message,
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
              });
            } else {
              toast({
                title: resData.message,
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
              });
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input {...field} placeholder="Email@address.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box width={"100%"} height={5} />
              <Button
                mt={4}
                width={"100%"}
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Flex>
  );
};

export default ForgotPassword;
