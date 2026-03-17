import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { CreateUserDTO } from '../../../dtos/user/UserDTO';
import { CasesStatus } from '../../../types/CasesStatus';
import { LawsuitStatus } from '../../../types/LawsuitStatus';
import { UserRole } from '../../../types/UserRole';
import { PostgreConnector } from '../PostgreConnector';
import { TableNames } from '../types/TableNames';
import { PostgreLawsuitRepository } from './PostgreLawsuitRepository';

describe(`Testing ${PostgreLawsuitRepository.name}`, () => {
  const dbConnection = PostgreConnector.getInstance();
  beforeAll(async () => {
    await dbConnection.connect();
  });

  beforeEach(async () => {
    await dbConnection.cleanTable(TableNames.users);
    await dbConnection.cleanTable(TableNames.lawsuits);
    await dbConnection.cleanTable(TableNames.lawsuits_lawyers_relation);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  function mockup() {
    const lawsuitRepository = new PostgreLawsuitRepository();

    const lawsuitData = {
      title: 'Indenização por danos morais',
      description: 'Cliente busa indenização por danos sofridos',
      court: UserRole.client,
      courtDivision: 'Vara xyz',
      status: LawsuitStatus.open,
      processNumber: '128448484848484',
    };

    return { lawsuitRepository, lawsuitData };
  }

  async function insertClientAndLawyerAndGetThem() {
    const clientData: CreateUserDTO = {
      firstName: 'Amélio',
      lastName: 'Montes',
      email: 'amelio@email.com',
      cpf: '14488755547',
      role: UserRole.client,
      password: 'amelio123',
    };

    const lawyerData: CreateUserDTO = {
      firstName: 'Jumar',
      lastName: 'Sílva',
      email: 'ju@email.com',
      cpf: '14554755547',
      role: UserRole.lawyer,
      password: 'juju123',
    };
    const query = {
      text: `INSERT INTO ${TableNames.users}(first_name, last_name, email, cpf, role, password) 
      VALUES 
      ($1, $2, $3, $4, $5, $6),
      ($7, $8, $9, $10, $11, $12)
      RETURNING *`,
      values: [
        clientData.firstName,
        clientData.lastName,
        clientData.email,
        clientData.cpf,
        clientData.role,
        clientData.password,

        lawyerData.firstName,
        lawyerData.lastName,
        lawyerData.email,
        lawyerData.cpf,
        lawyerData.role,
        lawyerData.password,
      ],
    };

    const result = await dbConnection.query(query);
    const rows = result.rows;
    const insertedClient = rows[0];
    const insertedLawyer = rows[0];

    return { clientData, insertedClient, lawyerData, insertedLawyer };
  }

  test(`should create a new registry in ${TableNames.lawsuits} table`, async () => {
    const { lawsuitRepository, lawsuitData } = mockup();
    const { insertedClient, insertedLawyer } = await insertClientAndLawyerAndGetThem();

    const newLawsuit = { client: insertedClient.id, lawyers: [insertedLawyer.id], ...lawsuitData };

    const createdLawsuit = await lawsuitRepository.create(newLawsuit);

    const selectLawsuitResult = await dbConnection.query(
      `SELECT * FROM ${TableNames.lawsuits} WHERE id = ${createdLawsuit.id}`
    );
    const lawSuitRow = selectLawsuitResult.rows[0];

    expect(lawSuitRow.title).toBe(lawsuitData.title);
    expect(lawSuitRow.description).toBe(lawsuitData.description);
    expect(lawSuitRow.court).toBe(lawsuitData.court);
    expect(lawSuitRow.court_division).toBe(lawsuitData.courtDivision);
    expect(lawSuitRow.process_number).toBe(lawsuitData.processNumber);
    expect(lawSuitRow.status).toBe(lawsuitData.status);
  });

  test(`should create a new registry in ${TableNames.lawsuits_lawyers_relation} table`, async () => {
    const { lawsuitRepository, lawsuitData } = mockup();
    const { insertedClient, insertedLawyer } = await insertClientAndLawyerAndGetThem();

    const newLawsuit = {
      client: insertedClient.id,
      lawyers: [insertedLawyer.id],
      ...lawsuitData,
    };
    const createdLawsuit = await lawsuitRepository.create(newLawsuit);

    const selectLawsuitResult = await dbConnection.query(
      `SELECT * FROM ${TableNames.lawsuits_lawyers_relation} WHERE lawsuit_id = ${createdLawsuit.id}`
    );
    const row = selectLawsuitResult.rows[0];

    expect(row.lawsuit_id).toBe(createdLawsuit.id);
    expect(row.lawyer_id).toBe(insertedLawyer.id);
  });

  test('should find all users', async () => {
    const { lawsuitRepository, lawsuitData } = mockup();
    const { insertedClient, insertedLawyer } = await insertClientAndLawyerAndGetThem();

    const insertLawsuitResult = await dbConnection.query({
      text: `
      INSERT INTO ${TableNames.lawsuits}(title, description, client_id, court, court_division, process_number, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
      `,
      values: [
        lawsuitData.title,
        lawsuitData.description,
        insertedClient.id,
        lawsuitData.court,
        lawsuitData.courtDivision,
        lawsuitData.processNumber,
        lawsuitData.status,
      ],
    });
    const row = insertLawsuitResult.rows[0];
    const lawsuitId = row.id;

    await dbConnection.query({
      text: `
       INSERT INTO ${TableNames.lawsuits_lawyers_relation}(lawsuit_id, lawyer_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      values: [lawsuitId, insertedLawyer.id],
    });

    const result = await lawsuitRepository.findAll();
    const foundLawsuit = result[0];

    expect(foundLawsuit!.title).toBe(lawsuitData.title);
    expect(foundLawsuit!.description).toBe(lawsuitData.description);
    expect(foundLawsuit!.court).toBe(lawsuitData.court);
    expect(foundLawsuit!.courtDivision).toBe(lawsuitData.courtDivision);
    expect(foundLawsuit!.processNumber).toBe(lawsuitData.processNumber);
    expect(foundLawsuit!.status).toBe(lawsuitData.status);
  });

  // test('should find a user by id', async () => {
  //   const { userRepository, userData } = mockup();

  //   const query = {
  //     text: `
  //     INSERT INTO users(first_name, last_name, email, cpf, role, password)
  //     VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING id;
  //     `,
  //     values: [
  //       userData.firstName,
  //       userData.lastName,
  //       userData.email,
  //       userData.cpf,
  //       userData.role,
  //       userData.password,
  //     ],
  //   };

  //   const result = await dbConnection.query(query);
  //   const row = result.rows[0];
  //   const id = row.id;

  //   const foundUser = await userRepository.findById(id);

  //   expect(foundUser?.firstName).toBe(userData.firstName);
  //   expect(foundUser?.lastName).toBe(userData.lastName);
  //   expect(foundUser?.email).toBe(userData.email);
  //   expect(foundUser?.cpf).toBe(userData.cpf);
  //   expect(foundUser?.role).toBe(userData.role);
  //   expect(foundUser?.password).toBe(userData.password);
  // });

  // test('should find a user by email', async () => {
  //   const { userRepository, userData } = mockup();

  //   const query = {
  //     text: `
  //     INSERT INTO users(first_name, last_name, email, cpf, role, password)
  //     VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING id;
  //     `,
  //     values: [
  //       userData.firstName,
  //       userData.lastName,
  //       userData.email,
  //       userData.cpf,
  //       userData.role,
  //       userData.password,
  //     ],
  //   };

  //   await dbConnection.query(query);
  //   const foundUser = await userRepository.findByEmail(userData.email);

  //   expect(foundUser?.firstName).toBe(userData.firstName);
  //   expect(foundUser?.lastName).toBe(userData.lastName);
  //   expect(foundUser?.email).toBe(userData.email);
  //   expect(foundUser?.cpf).toBe(userData.cpf);
  //   expect(foundUser?.role).toBe(userData.role);
  //   expect(foundUser?.password).toBe(userData.password);
  // });

  // test('should return true if the user exists and false if the user does not exist', async () => {
  //   const { userRepository, userData } = mockup();

  //   const query = {
  //     text: `
  //     INSERT INTO users(first_name, last_name, email, cpf, role, password)
  //     VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING id;
  //     `,
  //     values: [
  //       userData.firstName,
  //       userData.lastName,
  //       userData.email,
  //       userData.cpf,
  //       userData.role,
  //       userData.password,
  //     ],
  //   };

  //   const result = await dbConnection.query(query);
  //   const row = result.rows[0];
  //   const id = row.id;
  //   const checkExistingUser = await userRepository.exists(id);
  //   const checkNonExistingUser = await userRepository.exists('55');

  //   expect(checkExistingUser).toBeTruthy();
  //   expect(checkNonExistingUser).toBeFalsy();
  // });
});
