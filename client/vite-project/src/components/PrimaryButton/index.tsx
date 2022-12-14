import { FC } from 'react';

interface IPrimaryButton {
  title: string;
  type: 'button' | 'submit';
  isOutline?: boolean;
  iconName?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  isDanger?: boolean;
  large?: string;
  small?: string;
  margin?: string;
}

const PrimaryButton: FC<IPrimaryButton> = ({
  title,
  type,
  isOutline,
  iconName,
  onClick,
  className,
  small,
  margin,
  isLoading = false,
  isDanger = false
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${isOutline ? 'outline-' : ''}${
        isDanger ? 'danger ' : 'primary '
      } add-btn 
        ${small} ${margin && margin}`}
      id="create-btn"
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="d-flex align-items-center justify-content-center">
        {iconName && <i className={`${iconName} align-bottom me-1`} />}
        {title}
        {isLoading && (
          <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default PrimaryButton;
