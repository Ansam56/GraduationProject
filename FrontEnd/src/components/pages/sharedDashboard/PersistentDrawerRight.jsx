//داشبورد مشترك لكل اليوزر بحيث اذا تم اجراء اي تعديل من هنا سيظهر التعديل لكل اليوزر

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Card } from 'react-bootstrap';
import { Avatar, CardContent, Skeleton} from '@mui/material';
import { Link } from 'react-router-dom';
import style from './PersistentDrawerRight.module.css'
import Logo from '../logo/Logo';
import { UserContext } from '../../context/UserContext';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
//  const drawerWidth = 240;
const drawerWidth = 290;
// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     /**
//      * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
//      * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
//      * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
//      * proper interaction with the underlying content.
//      */
//     position: 'relative',
//     variants: [
//       {
//         props: ({ open }) => open,
//         style: {
//           transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           marginRight: 0,
//         },
//       },
//     ],
//   }),
// );
const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({component, links, title, SideBarTitle,image}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [activeButton, setActiveButton] = React.useState(0);// زر مفعّل افتراضيًا
  const [openDropDounMenu, setOpenDropDownMenu] = React.useState(true);

  const handleClick = (index) => {
    setOpenDropDownMenu(!openDropDounMenu);
    handleButtonClick(index);
  };

  let {Logout, userData}=React.useContext(UserContext);
   
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleButtonClick = (index) => {
    setActiveButton(index); // تحديث الزر النشط عند الضغط
    //  handleDrawerClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth, 
             backgroundColor: '#688860',
          },
        }}
        // variant="persistent"
        variant="temporary"
        onClose={handleDrawerClose}
        anchor="right"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> 
          {userData?
          <h3 className={`${style.SideBarTitle} m-auto `}>{SideBarTitle}</h3> 
  :<Skeleton variant="text" sx={{ fontSize: '2rem',width:"10rem" }} />}
        </DrawerHeader>
        <Divider />
        <List className="text-center">
          {userData?
          <>
          {links.map((link, index) => (
            link.children?
            <>  
             <ListItem 
             key={index}
              className={`${style.links} text-end`} 
              style={{
                color: activeButton === index ? "#506550" : "#F1ECE1", 
                cursor: 'pointer',
                padding:"15px"
              }}  
              sx={{ 
                backgroundColor: activeButton === index ? "#f1ece1" : "inherit", // لون الخلفية للزر النشط 
                borderTopLeftRadius: '20px', // زاوية مستديرة من الأعلى يسار
                borderBottomLeftRadius: '20px', // زاوية مستديرة من الأسفل يسار
                "&:hover":
                activeButton !== index
                  ? { backgroundColor: "#f1ece118",transition: "background-color 0.3s ease", } // hover فقط للأزرار غير النشطة
                  : {},
              }}
              onClick={() => handleClick(index)} // تحديث الزر النشط عند الضغط 
            > 
                <ListItemIcon className={`${style.linkIcon} `}
                style={{
                  color: activeButton === index ? "#506550" : "#F1ECE1", 
                }}
                >
                  {link.icon}
                </ListItemIcon>
              
                   {link.name}
                {openDropDounMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
             
            
        <Collapse in={openDropDounMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {link.children.map((subItem,index)=>(
          <Link  key={index} className={`${style.links} `} to={subItem.target} 
                   style={{
                     color: "#F1ECE1", 
                   }} >  
           <ListItem 
             className="pe-5" 
              sx={{ 
                borderTopLeftRadius: '20px', // زاوية مستديرة من الأعلى يسار
                borderBottomLeftRadius: '20px', // زاوية مستديرة من الأسفل يسار
                 "&:hover": 
                  { backgroundColor: "#f1ece118",transition: "background-color 0.3s ease", } // hover فقط للأزرار غير النشطة
              }} 
               
            > 
                <ListItemIcon className={`${style.linkIcon} `}
                style={{
                  color:"#F1ECE1", 
                }}
                >
                   {subItem.icon}
                </ListItemIcon>
               
                {subItem.name}
                
            </ListItem>
            
          </Link>
          ))} 
        </List>
           </Collapse>
            </>
            : 
            <Link  key={index} className={`${style.links} `} to={link.target} 
             style={{
               color: activeButton === index ? "#506550" : "#F1ECE1", 
             }} >
            <ListItem 
             className="text-end" 
             style={{
              padding:"15px"
             }}
              sx={{ 
                backgroundColor: activeButton === index ? "#f1ece1" : "inherit", // لون الخلفية للزر النشط 
                borderTopLeftRadius: '20px', // زاوية مستديرة من الأعلى يسار
                borderBottomLeftRadius: '20px', // زاوية مستديرة من الأسفل يسار
                "&:hover":
                activeButton !== index
                  ? { backgroundColor: "#f1ece118",transition: "background-color 0.3s ease", } // hover فقط للأزرار غير النشطة
                  : {},
                  
              }}
              onClick={() => handleButtonClick(index)} // تحديث الزر النشط عند الضغط 
            > 
                <ListItemIcon className={`${style.linkIcon} `}
                style={{
                  color: activeButton === index ? "#506550" : "#F1ECE1", 
                }}
                >
                  {link.icon}
                </ListItemIcon>
              
                   {link.name}
                {/* </Link> */}
                {/* <Link className={`${style.links}`} to={link.target} 
                style={{
                  color: activeButton === index ? "#506550" : "#F1ECE1", 
                }}
                >
                   {link.subName}
                </Link>  */}
            </ListItem>
            </Link>
             
          ))} 
          </>
          :<Skeleton className='m-auto' variant="rectangular" width={210} height={200}/>}
        </List> 
     
      </Drawer>
      <AppBar className={`${style.appBar}`} position="fixed" open={open}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: 'none' }]}
          >
         <MenuIcon />
        </IconButton> 
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
         {userData?title:<Skeleton variant="text" sx={{ fontSize: '2rem',width:"10rem" }} />} 
        </Typography>
        <DropdownMenu />
        {userData?<Avatar alt="user image" src={image} />:<Skeleton variant="circular" width={40} height={40} />}
      
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
          <CardContent >
            {userData? component:<Skeleton className='m-auto' variant="rectangular" width="100%" height={200} />}
          </CardContent>
        </Card>
      </Main>
    </Box>
  );
}
