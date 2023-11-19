import { FC, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { getCatBreedInfoByImageId } from '../requests/catRequests';
import { useParams, useNavigate } from 'react-router-dom';
import { CatBreed } from '../types/cat.types';
import { DEFAULT_GET_ERROR_MESSAGE } from '../constants/notification.constants';
import useNotificationContext from '../hooks/useNotificationContext';

const Cat: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fireNotification } = useNotificationContext();

  const [catInfo, setCatInfo] = useState<CatBreed | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        axios(getCatBreedInfoByImageId(id))
          .then(({ data }) => {
            const breedInfo = data.breeds[0];

            setCatInfo({
              id: data.id,
              name: breedInfo.name,
              image: data.url,
              origin: breedInfo.origin,
              countryCode: breedInfo.country_code,
              description: breedInfo.description,
              temperament: breedInfo.temperament,
            });
          })
          .catch(() =>
            fireNotification({
              message: DEFAULT_GET_ERROR_MESSAGE,
              type: 'danger',
            })
          );
      }
    })();
  }, []); // eslint-disable-line

  return (
    <Container className="cat">
      <Button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Container className="cat__content">
        {catInfo && (
          <Card>
            <Card.Img variant="top" src={catInfo.image} />
            <Card.Body>
              <div className="card__name">
                <Card.Title className="card__title">{catInfo.name}</Card.Title>
                <div className="card__origin">
                  {catInfo.origin}
                  {catInfo.countryCode && (
                    <Image
                      rounded
                      src={`https://flagsapi.com/${catInfo.countryCode}/shiny/64.png`}
                    />
                  )}
                </div>
              </div>

              <Card.Text className="card__temperament">
                {catInfo.temperament}
              </Card.Text>
              <Card.Text className="card__description">
                {catInfo.description}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </Container>
  );
};

export default Cat;
