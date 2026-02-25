import { CreateUserDTO } from '../../../dtos/user/CreateUserDTO';
import { User } from '../../../entities/User';
import { UserRepository } from '../../../repositories/UserRepository';
import { WithId } from '../../../types/WithId';
import { PostgreConnector } from '../PostgreConnector';

const dbConnection = PostgreConnector.getInstance();

export class PostgreUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<WithId<User>> {
    const { firstName, lastName, email, cpf, role, password } = data;

    const query = {
      text: `
      INSERT INTO users(first_name, last_name, email, cpf, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      values: [firstName, lastName, email, cpf, role, password],
    };

    const result = await dbConnection.query(query);

    const newUser = result.rows[0];

    return {
      id: newUser.id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
      cpf: newUser.cpf,
      role: newUser.role,
      password: newUser.password,
    };
  }

  async findAll(): Promise<WithId<User>[]> {
    const result = await dbConnection.query('SELECT * FROM users;');
    const rows = result.rows;
    const mappedRows = rows.map((row) => {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        cpf: row.cpf,
        role: row.role,
        password: row.password,
      };
    });

    return mappedRows;
  }

  async findById(id: string): Promise<WithId<User> | null> {
    const result = await dbConnection.query(`SELECT * FROM users WHERE id = ${id};`);
    const rows = result.rows;

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      cpf: user.cpf,
      role: user.role,
      password: user.password,
    };
  }

  async findByEmail(email: string): Promise<WithId<User> | null> {
    const result = await dbConnection.query(`SELECT * FROM users WHERE email = '${email}';`);
    const rows = result.rows;
    const user = rows[0];

    if (rows.length === 0) {
      return null;
    }

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      cpf: user.cpf,
      role: user.role,
      password: user.password,
    };
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.findById(id);
    return result !== null;
  }
}
