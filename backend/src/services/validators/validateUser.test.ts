import { CreateUserDTO } from '../../dtos/user/CreateUserDTO';
import { InvalidEmailError } from '../../errors/domain/InvalidEmailError';
import { InvalidNameError } from '../../errors/domain/InvalidNameError';
import { InvalidCPFError } from '../../errors/domain/InvalidCPFError';
import { InvalidPasswordError } from '../../errors/domain/InvalidPasswordError';
import { InvalidUserRoleError } from '../../errors/domain/InvalidUserRoleError';
import { validateUser } from './validateUser';

describe(`Testing ${validateUser.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when the data provided is completely valid', () => {
    const validUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'Jo#1558210',
      role: 'client',
    };
    const thrownError = getThrownError(() => validateUser(validUserDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidNameError if the firstName or lastName provided are invalid', () => {
    const invalidFirstNameUserDTO: CreateUserDTO = {
      firstName: 'John55',
      lastName: 'Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'Jo#1558210',
      role: 'client',
    };
    const invalidLastNameUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe#',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'Jo#1558210',
      role: 'client',
    };
    const thrownError1 = getThrownError(() => validateUser(invalidFirstNameUserDTO));
    const thrownError2 = getThrownError(() => validateUser(invalidLastNameUserDTO));
    expect(thrownError1).toBeInstanceOf(InvalidNameError);
    expect(thrownError2).toBeInstanceOf(InvalidNameError);
  });

  test('should throw InvalidEmailError when email is invalid', () => {
    const validUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnexample.com',
      cpf: '12345678901',
      password: 'Jo#1558210',
      role: 'client',
    };
    const thrownError = getThrownError(() => validateUser(validUserDTO));
    expect(thrownError).toBeInstanceOf(InvalidEmailError);
  });

  test('should throw InvalidCPFError when CPF is invalid', () => {
    const invalidCPFUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cpf: '5554444488',
      password: 'Jo#1558210',
      role: 'client',
    };
    const thrownError = getThrownError(() => validateUser(invalidCPFUserDTO));
    expect(thrownError).toBeInstanceOf(InvalidCPFError);
  });

  test('should throw InvalidPasswordError when password is invalid', () => {
    const invalidPasswordUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'weak',
      role: 'client',
    };
    const thrownError = getThrownError(() => validateUser(invalidPasswordUserDTO));
    expect(thrownError).toBeInstanceOf(InvalidPasswordError);
  });

  test('should throw InvalidUserRoleError when role is invalid', () => {
    const invalidRoleUserDTO: CreateUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'Jo#1558210',
      role: 'invalid_role' as any,
    };
    const thrownError = getThrownError(() => validateUser(invalidRoleUserDTO));
    expect(thrownError).toBeInstanceOf(InvalidUserRoleError);
  });
});
