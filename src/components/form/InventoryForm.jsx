import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, } from "@mui/material";
import Title from "../tools/Title";
import MarkdownField from "./fields/MarkdownField"
import CategoryField from "./fields/CategoryField"
import TagsField from "./fields/TagsField";
import PublicCheckbox from "./fields/PublicCheckbox"
import InventoryImageUpload from "./fields/InventoryImageUpload"
const InventoryForm = ({ categories, tagOptions, onSubmit }) => {

    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                category: "",
                tags: [],
                imageUrl: null,
                isPublic: false
            }}
            validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
                category: Yup.string().required("Required"),
            })}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue, handleBlur }) => (
                <Box sx={{ p: 3, borderRadius: "20px", maxWidth: '900px' }}>
                    <Title variant="h5">Add inventory</Title>
                    <Form>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title"
                            value={values.title}
                            onChange={e => setFieldValue("title", e.target.value)}
                        />

                        <MarkdownField
                            value={values.description}
                            onChange={val => setFieldValue("description", val)}
                            label="Description"
                        />

                        <CategoryField
                            value={values.category}
                            onChange={val => setFieldValue("category", val)}
                            categories={categories}
                        />

                        <TagsField
                            value={values.tags}
                            onChange={val => setFieldValue("tags", val)}
                            tagOptions={tagOptions}
                        />

                        <InventoryImageUpload
                            value={values.imageUrl}
                            onChange={(url) => setFieldValue("imageUrl", url)}
                        />

                        <PublicCheckbox
                            name="isPublic"
                            value={values}
                            onChange={e => setFieldValue("isPublic", e.target.checked)}
                            onBlur={handleBlur}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                        >
                            Save
                        </Button>
                    </Form>
                </Box>
            )}
        </Formik>
    );
}


export default InventoryForm
