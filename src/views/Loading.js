import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', height: '100%', width: '100%' }} >
      <div style={{ flex: '1' }} />
      <aha-spinner style={{ height: '60px', width: '60px' }} />
      <div style={{ flex: '1' }} />
    </div>
  )
}

export default Loading;
