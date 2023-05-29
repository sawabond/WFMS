import React from 'react';

function LinkText({ link, text }) {
  return (
    <div
      onClick={() => window.open(link)}
      style={{ color: 'blue', cursor: 'pointer' }}
    >
      {text}
    </div>
  );
}

export default LinkText;
