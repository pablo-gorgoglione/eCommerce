import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  description?: string;
  keyword?: string;
}

const Meta = ({ title, description, keyword }: Props) => {
  return (
    <Helmet>
      <title>{title ? title : 'Welcome to RamShop'}</title>
      <meta
        name='description'
        content={description ? description : 'Best products at the best price'}
      />
      <meta
        name='keyword'
        content={
          keyword ? keyword : 'electronics, buy electronics, cheap eletronics'
        }
      />
    </Helmet>
  );
};

export default Meta;
