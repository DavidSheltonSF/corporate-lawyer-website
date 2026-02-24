import { CreateUserDTO } from '../../../dtos/user/CreateUserDTO';
import { UserRole } from '../../../types/UserRole';
import { PostgreConnector } from '../PostgreConnector';
import { PostgreUserRepository } from './PostgreUserRepository';

describe(`Testing ${PostgreUserRepository.name}`, () => {
  const dbConnection = PostgreConnector.getInstance();
  beforeAll(async () => {
    await dbConnection.connect();
  });

  beforeEach(async () => {
    await dbConnection.cleanTable('users');
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  function mockup() {
    const userRepository = new PostgreUserRepository();

    return { userRepository };
  }

  test('should create a new user', async () => {
    const { userRepository } = mockup();

    const userData: CreateUserDTO = {
      firstName: 'Amélio',
      lastName: 'Montes',
      email: 'amelio@email.com',
      cpf: '14488755547',
      role: UserRole.client,
      password: 'amelio123',
    };

    const result = await userRepository.create(userData);

    expect(result.firstName).toBe(userData.firstName);
    expect(result.lastName).toBe(userData.lastName);
    expect(result.email).toBe(userData.email);
    expect(result.cpf).toBe(userData.cpf);
    expect(result.role).toBe(userData.role);
    expect(result.password).toBe(userData.password);
  });

  test('should find all users', async () => {
    const { userRepository } = mockup();

    const userData: CreateUserDTO = {
      firstName: 'Amélio',
      lastName: 'Montes',
      email: 'amelio@email.com',
      cpf: '14488755547',
      role: UserRole.client,
      password: 'amelio123',
    };

    const query = {
      text: `
      INSERT INTO users(first_name, last_name, email, cpf, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      values: [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.cpf,
        userData.role,
        userData.password,
      ],
    };

    await dbConnection.query(query);

    const result = await userRepository.findAll();

    expect(result[0]!.firstName).toBe(userData.firstName);
    expect(result[0]!.lastName).toBe(userData.lastName);
    expect(result[0]!.email).toBe(userData.email);
    expect(result[0]!.cpf).toBe(userData.cpf);
    expect(result[0]!.role).toBe(userData.role);
    expect(result[0]!.password).toBe(userData.password);
  });
});
