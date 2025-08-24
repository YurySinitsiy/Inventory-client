import { Checkbox } from "@mui/material";
import { useState, useEffect } from "react";

const SelectionColumn = ({ rows = [], selectedIds = [], setSelectedIds }) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  useEffect(() => {
    setIsAllSelected(selectedIds.length > 0 && selectedIds.length === rows.length);
    setIsIndeterminate(selectedIds.length > 0 && selectedIds.length < rows.length);
  }, [selectedIds, rows.length]);

  const handleSelectAll = (event) => {
    setSelectedIds(event.target.checked ? rows.map((i) => i.id) : []);
  };

  const handleRowSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    field: "selection",
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => (
      <Checkbox
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={handleSelectAll}
      />
    ),
    renderCell: (params) => (
      <Checkbox
        checked={selectedIds.includes(params.id)}
        onChange={() => handleRowSelection(params.id)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
};

export default SelectionColumn;
