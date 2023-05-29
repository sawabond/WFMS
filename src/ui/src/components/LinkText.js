import React from 'react';

function LinkText({ link, text, isNewWindow = false }) {
  return (
    <div
      onClick={() =>
        isNewWindow ? window.open(link) : window.location.replace(link)
      }
      style={{ color: 'blue', cursor: 'pointer' }}
    >
      {text}
    </div>
  );
}

export default LinkText;
