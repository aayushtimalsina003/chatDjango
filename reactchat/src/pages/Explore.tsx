import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import ExploreServers from "../components/Main/ExploreServers";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDrawer>
        <PopularChannels open={false} />
      </PrimaryDrawer>
      <SecondaryDraw>
        <ExploreCategories />
      </SecondaryDraw>
      <Main>
        <ExploreServers />
      </Main>
    </Box>
  );
};

export default Home;
