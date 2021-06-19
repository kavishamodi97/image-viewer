import React from "react";
import "./Header.css";
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

  return (
    <div>
      <header>
        <div className="app-header">
          <span className="header-title">{props.title}</span>
          {props.showHomePage === "home" && (
            <div className="header-right">
              <Input
                id="search-box"
                type="search"
                className="search-field"
                variant="outlined"
                placeholder="Search…"
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
                src="/static/images/avatar/1.jpg"
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
                  }}
                  onClick={handleClose}
                >
                  My account
                </MenuItem>
                <hr className="menu-line" />
                <MenuItem
                  style={{
                    fontSize: "medium",
                    fontWeight: "bold",
                  }}
                  onClick={handleClose}
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
