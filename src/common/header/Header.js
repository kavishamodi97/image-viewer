import React from "react";
import "./Header.css";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const Header = (props) => {
  return (
    <div>
      <header>
        <div className="app-header">
          <span className="header-title">{props.title}</span>
          {props.showHomePage === "home" && (
            <div className="header-right">
              <Input
                id="search"
                type="search"
                className="search-field"
                variant="outlined"
                placeholder="Search…"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
              />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
