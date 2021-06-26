import React from "react";
import "./Header.css";
import instaLogo from "../../assets/insta.png";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogoHandler = () => {
    sessionStorage.getItem("access-token") !== null ? props.history.push("/home") : props.history.push("/");
  }

  const profileClickHandler = () => {
    props.history.push("/profile");
  };

  const logoutClickHandler = () => {
    sessionStorage.removeItem("access-token");
    props.history.push("/");
  };

  //Render UI Inside Header Section When Appropriate Screen Matches e.g:-Home,Profile
  return (
    <div>
      <header>
        <div className="app-header">
          <span className="header-title" onClick={() => { onClickLogoHandler() }}>{props.title}</span>
          {props.showHomePage === "home" && (
            <div className="header-right">
              <Input
                id="search-box"
                type="search"
                className="search-field"
                variant="outlined"
                placeholder="Search…"
                onChange={(e) => { props.searchHandler(e.target.value) }}
                startAdornment={
                  <InputAdornment
                    variant="standard"
                    position="start"
                    id="searchBoxIcon"
                    style={{ backgroundColor: "#c0c0c0" }}
                  >
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
                disableUnderline={true}
              />
              <Avatar
                alt="Remy Sharp"
                src={instaLogo}
                className="icon-large"
                onClick={handleClick}
              />
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  style={{
                    fontSize: "medium",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    profileClickHandler();
                  }}
                >
                  My account
                </MenuItem>
                <hr className="menu-line" />
                <MenuItem
                  style={{
                    fontSize: "medium",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    logoutClickHandler();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
          {
            props.showProfilePage === "profile" && (
              <div className="header-right">
                <Avatar
                  alt="Remy Sharp"
                  src={instaLogo}
                  className="icon-large"
                  onClick={handleClick}
                />
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    style={{
                      fontSize: "medium",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      logoutClickHandler();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
        </div>
      </header>
    </div>
  );
};

export default Header;
