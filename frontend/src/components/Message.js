import React from 'react'
import Alert from '@mui/material/Alert';

function Message({severity, error}) {
  return (
    <div>
      <Alert severity={severity}>{error}</Alert>
    </div>
  )
}

export default Message
