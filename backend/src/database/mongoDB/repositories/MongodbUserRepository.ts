import { UserRepository } from '../../../repositories/UserRepository';
import { WithId } from '../../../types/WithId';
import { UserModel } from '../../../models/UserModel';
import { User } from '../../../entities/User';
import { UserQuery } from '../../../types/UserQuery';
import { Page } from '../../../types/Page';
import { UserRole } from '../../../types/UserRole';
import { UserMapper } from '../../../mappers/User/UserMapper';
import { UpdateUserDTO } from '../../../dtos/user/UpdateUserDTO';
import { UserDTO } from '../../../dtos/user/UserDTO';
import { UserWithCases } from '../../../types/UserWithCases';
import { CaseMapper } from '../../../mappers/Case/CaseMapper';
import { CaseModel } from '../../../models/CaseModel';

export class MongodbUserRepository implements UserRepository {
  async create(data: UserDTO): Promise<WithId<UserDTO>> {
    const user = await UserModel.create(data);
    return UserMapper.persistenceToPresentation(user);
  }

  async findAll(): Promise<WithId<UserDTO>[]> {
    const users = await UserModel.find({}).lean();
    return users.map(UserMapper.persistenceToPresentation);
  }

  async findClients(userQuery: UserQuery): Promise<Page<WithId<UserDTO>>> {
    const { query, limit = 10, page = 1 } = userQuery;

    const regex = new RegExp(query || '', 'i');

    const filter = {
      role: UserRole.client,
      $or: [{ firstName: regex }, { lastName: regex }, { email: regex }, { cpf: regex }],
    };

    const clientsQuery = UserModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    const clientsTotalQuery = UserModel.countDocuments(filter);

    const [clients, totalItems] = await Promise.all([clientsQuery, clientsTotalQuery]);

    const mappedUsers = clients.map(UserMapper.persistenceToPresentation);

    return {
      data: mappedUsers,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<WithId<UserDTO> | null> {
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return null;
    }
    return UserMapper.persistenceToPresentation(user);
  }

  async findByIdWithCases(id: string): Promise<WithId<UserWithCases> | null> {
    const user = await UserModel.findById(id).lean();
    const cases = await CaseModel.find({ client: id }).lean();

    if (!user) {
      return null;
    }

    const mappedCases = cases.map(CaseMapper.persistenceToPresentation);

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      cases: mappedCases,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<WithId<UserDTO> | null> {
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    return UserMapper.persistenceToPresentation(user);
  }

  async deleteById(id: string): Promise<WithId<UserDTO> | null> {
    const result = await UserModel.findOneAndDelete({ _id: id });
    if (!result) return null;
    return UserMapper.persistenceToPresentation(result);
  }

  async updateById(id: string, data: UpdateUserDTO): Promise<WithId<UserDTO> | null> {
    const result = await UserModel.findOneAndUpdate({ _id: id }, data, { returnDocument: 'after' });
    if (!result) return null;
    return UserMapper.persistenceToPresentation(result);
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
