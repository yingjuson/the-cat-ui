import { FC } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CatImage } from '../types/cat.types';
import { useNavigate } from 'react-router-dom';

interface Props {
  catImage: CatImage;
}

const CatCard: FC<Props> = ({ catImage }) => {
  const navigate = useNavigate();

  const goToSingleCatPage = () => {
    navigate(`/${catImage.id}`);
  };

  return (
    <Card className="cat-card">
      <Card.Img variant="top" src={catImage.url} className="cat-card__img" />
      <Card.Body className="cat-card__body">
        <Button variant="primary" onClick={goToSingleCatPage}>
          View details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CatCard;
