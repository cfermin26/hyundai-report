import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

function DrawerAppBar(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "#002e6b" }}>
        <Toolbar>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: "block" },
              py: { xs: 2, md: 0 },
              ml: { xs: 4, md: 0 },
            }}
          >
            <Link to="/">
              <StaticImage
                src="../images/hyundai-logo.png"
                alt="hyundai logo"
                className="logo"
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
