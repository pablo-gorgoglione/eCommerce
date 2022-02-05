import { Alert } from 'react-bootstrap';

interface Props {
  variant?: 'danger' | 'success' | 'info' | 'warning';
  // children: JSX.Element | JSX.Element[];
  children: React.ReactNode;
}

const Message: React.FC<Props> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
