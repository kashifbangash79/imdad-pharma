import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { green } from '@mui/material/colors';

function DropdownMenu({ navLabel, navItems,handleNavLinkClick,islarge }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="dropdown-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
    

        sx={{
        //   color: '#FF5722', // Change text color
          fontWeight:`${!islarge ? 'bold' : 'normal'}`, // Change font weight
        color:'black',
        padding: "0",
        fontSize: `${islarge? '14px' : '20px'}`,
        
        textTransform: "none",
          fontFamily: 'Arial, sans-serif', // Change font family
        //   '&:hover': {
        //     backgroundColor: 'rgba(255, 87, 34, 0.1)', // Change background on hover
        //   },
        }}
      >
        {navLabel}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
       
      >
        {navItems.map((item, index) => (
        <NavLink to={item.link} key={index} onClick={handleNavLinkClick}>
        <MenuItem
            key={index}
            onClick={handleClose}
           
          >
            {item.name}
          </MenuItem>
        </NavLink>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;
