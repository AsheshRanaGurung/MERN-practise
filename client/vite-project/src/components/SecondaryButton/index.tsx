import React, { FC } from 'react';
import { useState } from 'react';

interface ISecondaryButton {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  style?: any;
}
const SecondaryButton: FC<ISecondaryButton> = ({ title, onClick, isLoading = false, style }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-light border"
      onClick={onClick}
      disabled={isLoading}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={hover ? { backgroundColor: 'blue', color: '#fff' } : {}}
    >
      <>
        {title}
        {isLoading && (
          <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </>
    </button>
  );
};

export default SecondaryButton;
