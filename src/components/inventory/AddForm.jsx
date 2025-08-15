import { useState } from "react";
import { Formik, Form } from "formik";
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Title from "../Title";

const AddForm = ({ onSubmit, fields, title, submitText }) => {
    return (
        <Formik
            onSubmit={onSubmit}
        >
            {({ }) => (
                <Form>
                    <Title variant="h5">{title}</Title>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 3, py: 1.5 }}
                        disabled={isSubmitting}
                    >
                        {submitText}
                    </Button>
                </Form>
            )}



        </Formik>
    )
}

export default AddForm