import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}

type Props = {
  open: boolean;
};

const PopularChannels: React.FC<Props> = ({ open }) => {
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    "/server/select/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography sx={{ display: open ? "block" : "none" }}>
          Popular
        </Typography>
      </Box>
      <List>
        {dataCRUD.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/server/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar
                      alt="Server Icon"
                      src={`${MEDIA_URL}${item.icon}`}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "textSecondary",
                      }}
                    >
                      {item.category}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                  slotProps={{
                    primary: {
                      sx: {
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default PopularChannels;
