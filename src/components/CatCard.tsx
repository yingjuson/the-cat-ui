import { FC } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CatImage } from '../types/cat.types';

interface Props {
  catImage: CatImage;
}

const CatCard: FC<Props> = ({ catImage }) => (
  <Card className="cat-card">
    <Card.Img variant="top" src={catImage.url} className="cat-card__img" />
    <Card.Body className="cat-card__body">
      <Button variant="primary">View details</Button>
    </Card.Body>
  </Card>
);

export default CatCard;
