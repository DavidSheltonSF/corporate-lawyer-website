import { InvalidCityError } from '../../errors/domain/InvalidCityError';
import { City } from '../../types/City';

export function getCity(city: string): City {
  switch (city) {
    case City.RIO_DE_JANEIRO:
      return City.RIO_DE_JANEIRO;

    case City.BELFORD_ROXO:
      return City.BELFORD_ROXO;

    case City.DUQUE_DE_CAXIAS:
      return City.DUQUE_DE_CAXIAS;

    default:
      throw new InvalidCityError(city);
  }
}
