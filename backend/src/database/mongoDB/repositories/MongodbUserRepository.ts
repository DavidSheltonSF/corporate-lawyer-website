import { UserRepository } from '../../../repositories/UserRepository';
import { WithId } from '../../../types/WithId';
import { UserModel } from '../../../models/UserModel';
import { CreateUserDTO } from '../../../dtos/user/CreateUserDTO';
import { User } from '../../../entities/User';
import { UserQuery } from '../../../types/UserQuery';
import { Page } from '../../../types/Page';
import { UserRole } from '../../../types/UserRole';
import { UserMapper } from '../../../mappers/UserMapper';

export class MongodbUserRepository implements UserRepository {
  async findAll(): Promise<WithId<User>[]> {
    const users = await UserModel.find({}).lean();
    return users.map((user) => {
      return {
        id: user._id.toString(),
        ...user,
      };
    });
  }

  async findClients(userQuery: UserQuery): Promise<Page<WithId<User>>> {
    const { query, limit = 10, page = 1 } = userQuery;

    const regex = new RegExp(query || '', 'i');

    const filter = {
      role: UserRole.client,
      $or: [{ firstName: regex }, { lastName: regex }, { email: regex }, { cpf: regex }],
    };

    const clientsQuery = UserModel.find(filter);
    const clientsTotalQuery = UserModel.countDocuments(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const [clients, totalItems] = await Promise.all([clientsQuery, clientsTotalQuery]);

    const mappedUsers = clients.map(UserMapper.persistenceToDomain);

    return {
      data: mappedUsers,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<WithId<User> | null> {
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return null;
    }
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<WithId<User> | null> {
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(data: CreateUserDTO): Promise<WithId<User>> {
    const user = await UserModel.create(data);

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async existsById(id: string): Promise<boolean> {
    const result = await UserModel.findById(id);
    return result !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await UserModel.findOne({ email });
    return result !== null;
  }
}
