import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

type Props = {
  open: boolean;
  handleDrawOpen: () => void;
  handleDrawClose: () => void;
};

const DrawToggle = ({ open, handleDrawOpen, handleDrawClose }: Props) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={open ? handleDrawClose : handleDrawOpen}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawToggle;
