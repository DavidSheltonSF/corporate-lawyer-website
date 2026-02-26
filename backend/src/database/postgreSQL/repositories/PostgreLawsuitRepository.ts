import format from 'pg-format';
import { CreateCaseDTO } from '../../../dtos/user/CreateCaseDTO';
import { Case } from '../../../entities/Case';
import { CaseRepository } from '../../../repositories/CaseRepository';
import { WithId } from '../../../types/WithId';
import { PostgreConnector } from '../PostgreConnector';
import { TableNames } from '../types/TableNames';
import { mapRowToLawsuit } from '../mappers/mapRowToLawsuit';

const dbConnection = PostgreConnector.getInstance();

export class PostgreLawsuitRepository {
  async create(data: CreateCaseDTO): Promise<WithId<Case>> {
    try {
      const { title, client, lawyers, description, court, courtDivision, processNumber, status } =
        data;

      await dbConnection.query('BEGIN');
      const insertLawsuitQuery = {
        text: `
      INSERT INTO ${TableNames.lawsuits}(title, client_id, description, court, court_division, process_number, status)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
        values: [title, client, description, court, courtDivision, processNumber, status],
      };

      const insertLawsuitResult = await dbConnection.query(insertLawsuitQuery);
      const lawsuit = insertLawsuitResult.rows[0];

      const insertLawyerRelationQueryText = `
      INSERT INTO ${TableNames.lawsuits_lawyers_relation}(lawsuit_id, lawyer_id)
      VALUES 
      %L
      RETURNING *;
      `;

      const insertLawyerRelationQueryValue = lawyers.map((lawyerId) => {
        return [lawsuit.id, lawyerId];
      });

      const insertLawyerRelationResult = await dbConnection.query(
        format(insertLawyerRelationQueryText, insertLawyerRelationQueryValue)
      );

      const newLawsuit = insertLawsuitResult.rows[0];
      const lawyersIds = insertLawyerRelationResult.rows.map((row) => row.lawyer_id);

      await dbConnection.query('COMMIT');
      return mapRowToLawsuit(newLawsuit, lawyersIds);
    } catch (error) {
      await dbConnection.query('ROLLBACK');
      throw error;
    }
  }

  async findAll(): Promise<WithId<Case>[]> {
    const result = await dbConnection.query(`
      SELECT 
      l.*,
      COALESCE(
        json_agg(llr.lawyer_id)
        FILTER (WHERE llr.lawyer_id IS NOT NULL),
        '[]'
        ) AS lawyers
      FROM ${TableNames.lawsuits} l
      LEFT JOIN ${TableNames.lawsuits_lawyers_relation} llr
        ON llr.lawsuit_id = l.id
      GROUP BY l.id
      ORDER BY l.id;
      `);
    const rows = result.rows;
    const mappedRows = rows.map((row) => {
      return mapRowToLawsuit(row, row.lawyers);
    });

    return mappedRows;
  }

  // async findById(id: string): Promise<WithId<Lawsuit> | null> {
  //   const result = await dbConnection.query(`SELECT * FROM lawsuits WHERE id = ${id};`);
  //   const rows = result.rows;

  //   if (rows.length === 0) {
  //     return null;
  //   }

  //   const lawsuit = rows[0];

  //   return {
  //     id: lawsuit.id,
  //     firstName: lawsuit.first_name,
  //     lastName: lawsuit.last_name,
  //     email: lawsuit.email,
  //     cpf: lawsuit.cpf,
  //     role: lawsuit.role,
  //     password: lawsuit.password,
  //   };
  // }

  // async findByEmail(email: string): Promise<WithId<Lawsuit> | null> {
  //   const result = await dbConnection.query(`SELECT * FROM lawsuits WHERE email = '${email}';`);
  //   const rows = result.rows;
  //   const lawsuit = rows[0];

  //   if (rows.length === 0) {
  //     return null;
  //   }

  //   return {
  //     id: lawsuit.id,
  //     firstName: lawsuit.first_name,
  //     lastName: lawsuit.last_name,
  //     email: lawsuit.email,
  //     cpf: lawsuit.cpf,
  //     role: lawsuit.role,
  //     password: lawsuit.password,
  //   };
  // }

  // async exists(id: string): Promise<boolean> {
  //   const result = await this.findById(id);
  //   return result !== null;
  // }
}
