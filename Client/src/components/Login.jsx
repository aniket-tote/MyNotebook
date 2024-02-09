import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  useToast,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();

  let navigate = useNavigate();

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      height={"calc(100vh - 4rem)"}
      paddingX={"28"}
    >
      <Flex
        className="logo"
        width={"30%"}
        fontSize={"8xl"}
        display={["none", "mone", "flex"]}
      >
        Log In
      </Flex>
      <Divider
        orientation="vertical"
        height={"50%"}
        display={["none", "mone", "flex"]}
      />
      <Flex className="form" flexDirection={"column"} experimental_spaceY={5}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, actions) => {
            const response = await fetch(
              `${
                import.meta.env.VITE_REACT_APP_SERVER_BASE_URL
              }/auth/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              }
            );
            const json = await response.json();
            actions.setSubmitting(false);

            if (json.success) {
              localStorage.setItem("token", json.authtoken);
              navigate("/");
              toast({
                title: json.message.toString(),
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
              });
            } else {
              toast({
                title: json.message.toString(),
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
              });
            }
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
              <Box width={"100%"} height={2} />
              <Link to="/forgotpassword">Forgot your password?</Link>
              <Box width={"100%"} height={5} />
              <Button
                mt={4}
                width={"100%"}
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="/signup">
          Not Registered yet! Sign up{" "}
          <Text
            display={"inline"}
            textColor={"blue.500"}
            textDecoration={"underline"}
          >
            here.
          </Text>{" "}
        </Link>
      </Flex>
    </Flex>
  );
};

export default Login;
