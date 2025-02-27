import { Box, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import type { Server } from "../@types/server";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { dataCRUD, fetchData, error, isLoading } = useCrud<Server>(
    [],
    `/server/select/?by_serverid=${serverId}`
  );

  if (error !== null && error.message === "400") {
    navigate("/");
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Check if the channel exists in the server
  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    }

    return dataCRUD.some((server) =>
      server.channel_server.some(
        (channel) => channel.id === parseInt(channelId)
      )
    );
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDrawer>
        <UserServers open={false} data={dataCRUD} />
      </PrimaryDrawer>
      <SecondaryDraw>
        <ServerChannels data={dataCRUD} />
      </SecondaryDraw>
      <Main>
        <MessageInterface data={dataCRUD} />
      </Main>
    </Box>
  );
};

export default Server;
