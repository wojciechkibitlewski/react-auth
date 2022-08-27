import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DrawerHeader } from '../Layout/DrawerHeader';

const Users = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <DrawerHeader />
        
        <Typography paragraph>
            USERS 
        </Typography>
    </Box>
  )
}

export default Users