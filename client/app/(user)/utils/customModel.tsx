import React, { FC } from "react";
import { Box, Modal } from "@mui/material";
type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute: any;
  activeItem: number;
  component: any;
};

const CustomModel: FC<props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  activeItem,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
