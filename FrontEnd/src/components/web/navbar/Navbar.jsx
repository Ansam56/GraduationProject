import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import styles from "./Navbar.module.css";
import Logo from '../../pages/logo/Logo';
import { Link, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Loader from '../../pages/loader/Loader';
import { Skeleton } from '@mui/material';


const drawerWidth = 240;
const navItems = [
  {
    name: 'الصفحة الرئيسية',
    target:'/'
  },
  {
    name:'الميزات',
    target:'/features'
  },
  {
    name:'الاحصائيات',
    target:'/statistics'
  },
  {
    name:  'المدارس المشاركة', 
    target:'/schools'
  } 
];



function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let {userToken,Logout,userData}=useContext(UserContext); 
 
  let controlPanelTarget='/';
  if (userData&&userData.role=="admin"){
    controlPanelTarget='/Admin';  
    }else if(userData&&userData.role=="schoolAdmin"){
      controlPanelTarget='/SchoolAdmin';   
    }else if(userData&&userData.role=="teacher"){
      controlPanelTarget='/Teacher';  
    }else if(userData&&userData.role=="student" ||userData&&userData.role==="user"){
      controlPanelTarget='/Student';   
    } 
    
  //متل فكرة ال adapter
   const logout=()=>{
     Logout();
     // navigate('/login', { replace: true }); // Replace history to prevent back navigation
    }
    
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2  }}>
        {/* responsive logo */}
        <div className={`${styles.logoDiv} mx-auto `}>
              <Logo/>
        </div>
      </Typography>
      <Divider />
      <List >
        {navItems.map((item,index) => (
          <ListItem  key={index} sx={{ display: 'flex', justifyContent: 'center' }}  >
            <Link to={item.target} className={`${styles.navLinkSidebar} `}  > 
                <ListItemText primary={item.name} className='custom-text' />  
            </Link>
               
          </ListItem>
        ))}
          {userToken&&<ListItem  sx={{ display: 'flex', justifyContent: 'center' }}  >
            <Link to={controlPanelTarget} className={`${styles.navLinkSidebar} `}  > 
                <ListItemText primary="لوحة التحكم" className='custom-text' />  
            </Link>
               
          </ListItem>}
          <ListItem sx={{ display: 'flex', justifyContent: 'center' }} className='custom-text' >
           {!userToken?
                  <Link className={`${styles.btnSidebar} btn `} to="/login">
                  تسجيل الدخول
                 </Link>
                
               :  
                  <Link className={`${styles.btnSidebar} btn `} onClick={logout}>
                  تسجيل الخروج
                  </Link>
                }  
           </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
   
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* navbar */}
      <AppBar component="nav" className={`${styles.navbar}`}>
      <div className="container">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {/* web logo */}
            <div className={`${styles.logoDiv} `}>
            <Logo/>
            </div> 
          </Typography>
          <Box  sx={{flexGrow: 1, display: { xs: 'none', sm: 'block' } }} className='custom-text'>
             {navItems.map((item,index) => ( 
                  <Link to={item.target} key={index}  className={`${styles.navLink} me-4`} >
                     {item.name}
                  </Link>  
            ))} 
            {userToken&&  <Link to={controlPanelTarget} className={`${styles.navLink} me-4`} >
                     لوحة التحكم
           </Link>} 
          </Box>
          <Box  sx={{ display: { xs: 'none', sm: 'block' } }} className='custom-text'>
          {!userToken?
                  <Link className={`${styles.btn} btn `} to="/login">
                  تسجيل الدخول
                 </Link>
                
               : 
               <>
                <Link className={`${styles.btn} btn `} onClick={logout}>
                  {/* {userData?userData.userName:<Skeleton variant="text" sx={{ fontSize: '1rem',width:"5rem" }} />} */}
                  تسجيل الخروج
                  </Link>
               </>
                 
                }
            </Box>
         
        </Toolbar>
       </div>
      </AppBar>
     
       {/* عند الضغط عليها بترجعني لاول الصفحة */}
      <Toolbar id="back-to-top-anchor" />
      {/* هاي الايقونة عشان ترجعني للصفحة فوق  */}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" className={`${styles.ScrollTopIcon}`}>
          <KeyboardArrowUpIcon className={`${styles.KeyboardArrowUpIcon}`} />
        </Fab>
      </ScrollTop>

      {/* للشاشات الصغيرة  */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;




