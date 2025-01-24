import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({firstTap,firstComponent,secondTap,secondComponent}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box className='mt-3 mb-1'>
        <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example" sx={{
    '& .MuiTabs-indicator': {
      display: 'none', // إخفاء خط المؤشر
    },
  }}>
          <Tab 
           sx={{ 
             '&.Mui-selected': {
              color: 'white', // اللون عند التحديد
              background:'#688860',
            }, 
            fontSize:'17px',
            fontWeight:'bold' , 
            borderRadius: '20px',
          }}
          label={firstTap} 
           {...a11yProps(0)}
            />
          <Tab 
           sx={{ 
             '&.Mui-selected': {
              color: 'white', // اللون عند التحديد
              background:'#688860',
            }, 
            fontSize:'17px',
            fontWeight:'bold',
            borderRadius: '20px',
          }}
          label={secondTap}
           {...a11yProps(1)} 
           /> 
        </Tabs>


      </Box>
      <CustomTabPanel value={value} index={0}>
        {firstComponent}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {secondComponent}
      </CustomTabPanel> 
    </Box>
  );
}

