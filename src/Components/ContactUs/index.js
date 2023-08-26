import React from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { contactUsSchema } from '../../schemas';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Let's define form initial values for formik here

const initialValues = {
  name: '',
  email: '',
  query: '',
};

const ContactUs = () => {
  const loading = useSelector((state) => state.userReducer.loading);

  // initializing formik for form validations
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactUsSchema,

      // Let's handle form Submission
      onSubmit: (values, action) => {
        toast.success("Thanks for contacting us. We'll get back to you soon");
        action.resetForm();
      },
    });

  return (
    <Container
      className="my-2 d-flex flex-column justify-content-center align-items-center"
      id="contactUs"
      style={{ paddingBottom: '6rem', zIndex: 999 }}
    >
      <p className="fs-2 font-roboto text-center">Contact Us</p>
      <Form onSubmit={handleSubmit} className="w-100 w-md-50">
        {/* Name Field */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <Form.Text className="text-danger">{errors.name}</Form.Text>
          ) : null}
        </Form.Group>

        {/* email field */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        {/* Query field */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Enter your query here</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter query here"
            name="query"
            value={values.query}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.query && touched.query ? (
            <Form.Text className="text-danger">{errors.query}</Form.Text>
          ) : null}
        </Form.Group>

        {/* Button */}
        <Container className="text-center text-md-left">
          <Button variant="warning" type="submit">
            Submit Query
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default ContactUs;
