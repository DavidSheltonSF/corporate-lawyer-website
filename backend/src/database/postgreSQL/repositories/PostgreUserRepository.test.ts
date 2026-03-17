import { CreateUserDTO } from '../../../dtos/user/UserDTO';
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

    const userData: CreateUserDTO = {
      firstName: 'Amélio',
      lastName: 'Montes',
      email: 'amelio@email.com',
      cpf: '14488755547',
      role: UserRole.client,
      password: 'amelio123',
    };

    return { userRepository, userData };
  }

  test('should create a new user', async () => {
    const { userRepository, userData } = mockup();

    const createdUser = await userRepository.create(userData);

    const result = await dbConnection.query(`SELECT * FROM users WHERE id = ${createdUser.id}`);
    const row = result.rows[0];

    expect(row.first_name).toBe(userData.firstName);
    expect(row.last_name).toBe(userData.lastName);
    expect(row.email).toBe(userData.email);
    expect(row.cpf).toBe(userData.cpf);
    expect(row.role).toBe(userData.role);
    expect(row.password).toBe(userData.password);
  });

  test('should find all users', async () => {
    const { userRepository, userData } = mockup();

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

  test('should find a user by id', async () => {
    const { userRepository, userData } = mockup();

    const query = {
      text: `
      INSERT INTO users(first_name, last_name, email, cpf, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
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

    const result = await dbConnection.query(query);
    const row = result.rows[0];
    const id = row.id;

    const foundUser = await userRepository.findById(id);

    expect(foundUser?.firstName).toBe(userData.firstName);
    expect(foundUser?.lastName).toBe(userData.lastName);
    expect(foundUser?.email).toBe(userData.email);
    expect(foundUser?.cpf).toBe(userData.cpf);
    expect(foundUser?.role).toBe(userData.role);
    expect(foundUser?.password).toBe(userData.password);
  });

  test('should find a user by email', async () => {
    const { userRepository, userData } = mockup();

    const query = {
      text: `
      INSERT INTO users(first_name, last_name, email, cpf, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
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
    const foundUser = await userRepository.findByEmail(userData.email);

    expect(foundUser?.firstName).toBe(userData.firstName);
    expect(foundUser?.lastName).toBe(userData.lastName);
    expect(foundUser?.email).toBe(userData.email);
    expect(foundUser?.cpf).toBe(userData.cpf);
    expect(foundUser?.role).toBe(userData.role);
    expect(foundUser?.password).toBe(userData.password);
  });

  test('should return true if the user exists and false if the user does not exist', async () => {
    const { userRepository, userData } = mockup();

    const query = {
      text: `
      INSERT INTO users(first_name, last_name, email, cpf, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
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

    const result = await dbConnection.query(query);
    const row = result.rows[0];
    const id = row.id;
    const checkExistingUser = await userRepository.exists(id);
    const checkNonExistingUser = await userRepository.exists('55');

    expect(checkExistingUser).toBeTruthy();
    expect(checkNonExistingUser).toBeFalsy();
  });
});
