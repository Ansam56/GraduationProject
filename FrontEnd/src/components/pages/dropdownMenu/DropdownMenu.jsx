import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Skeleton, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function DropdownMenu() {
  const { userData, Logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dropdown-container">
      {userData ? (
        <div>
        <button
  onClick={handleClick}
  style={{
    display: "flex",
    alignItems: "center",
    background: "none", // إزالة الخلفية الافتراضية
    border: "none", // إزالة الحدود الافتراضية
    color: "#F1ECE1", // لون الخط المطلوب
    cursor: "pointer", // لجعل الماوس يظهر كيد عند التحويم
    fontSize: "1rem", // حجم الخط
    padding: "8px 12px", // إضافة مساحة داخلية
  }}
>
  <KeyboardArrowDownIcon style={{ marginLeft: "5px", color: "#F1ECE1" }} />
  {userData?.userName}
</button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose} 
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                الصفحة الرئيسية
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                Logout();
                handleClose();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              تسجيل خروج
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "8rem" }} />
      )}
    </div>
  );
}
