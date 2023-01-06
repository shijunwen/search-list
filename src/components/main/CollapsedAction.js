import React from 'react';
import DownOutlined from './down.js';

const CollapsedAction = ({ collapsed, setCollapsed, showFlag }) => {
  if (!showFlag) {
    return null;
  }
  return (
    <div className="collapsed">
      {collapsed ? (
        <span
          onClick={() => setCollapsed(!collapsed)}
        >
          <DownOutlined
            style={{ transform: 'rotateX(180deg)', cursor: 'pointer' }}
          />
        </span>
      ) : (
        <span
          onClick={() => setCollapsed(!collapsed)}
        >
          <DownOutlined style={{ cursor: 'pointer' }} />
        </span>
      )}
    </div>
  );
};

export default CollapsedAction;
