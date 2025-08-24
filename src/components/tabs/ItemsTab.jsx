import {
  Box,
  Button,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Modal from "../tools/Modal";
import Title from "../tools/Title";
const ItemsTab = ({ isCreator, isAdmin, inventory }) => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const fields = inventory.fields.fields;
  const columns = fields.map((field) => ({
    field: field.id, // unique key
    headerName: field.name,
    minWidth: 50,
    flex: 1,
  }));
  return (
    <>
      {(isCreator || isAdmin || writeAccess) && ( //!WriteAccess
        <Box mb={2}>
          <Button variant="outlined" onClick={() => setOpenAddModal(true)}>
            Add Item
          </Button>
          <Modal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Formik>
              <Form>
                <Title variant="h5" sx={{ mb: 1 }}>
                  Add item
                </Title>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {fields.map(({ type, name, id }) => {
                    const key = id;
                    if (type === "multiline") {
                      return (
                        <TextField
                          sx={{ width: "100%" }}
                          key={id}
                          type={type}
                          label={name}
                          multiline
                        />
                      );
                    }
                    if (type === "boolean") {
                      return (
                        <FormControlLabel
                          control={<Switch />}
                          label={name}
                          key={key}
                        />
                      );
                    }
                    return (
                      <TextField
                        key={key}
                        type={type}
                        label={name}
                        sx={{
                          width: "100%",
                        }}
                      />
                    );
                  })}
                  <Button variant="outlined">Save</Button>
                </Box>
              </Form>
            </Formik>
          </Modal>
        </Box>
      )}
      <DataGrid columns={columns} />
    </>
  );
};

export default ItemsTab;
