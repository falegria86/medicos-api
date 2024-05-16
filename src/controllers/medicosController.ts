import { Request, Response } from 'express';
import { Pool } from "pg";
import 'dotenv/config';

export class MedicosController {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DB_CONNECTION_STRING
        });
    }

    getMedicos = async (req: Request, res: Response) => {
        try {
            const result = await this.pool.query('SELECT * FROM medico');
            const medicos = result.rows;

            return res.status(200).json(medicos);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al obtener médicos: ', error });
        }
    }

    getMedicoById = async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const result = await this.pool.query('SELECT * FROM medico WHERE id_medico = $1', [id]);
            const medico = result.rows[0];

            return res.status(200).json(medico);
        } catch (error) {
            return res.status(500).json({ message: `Medico with id ${id} not found: `, error });
        }
    }

    createMedico = async (req: Request, res: Response) => {
        const { id_medico, nombre, apellido_paterno, apellido_materno } = req.body;

        const insertQuery = `INSERT INTO medico (id_medico, nombre, apellido_paterno, apellido_materno, createdat,
                            updatedat) VALUES ($1, $2, $3, $4, $5, $6)`;

        try {
            await this.pool.query(insertQuery, [id_medico, nombre, apellido_paterno, apellido_materno, new Date(), new Date()]);
            return res.status(200).json({ message: `Medico creado correctamente` });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    updateMedico = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { id_medico, nombre, apellido_paterno, apellido_materno } = req.body;

        let updateQuery: string = 'UPDATE medico SET';

        const updateFields: string[] = [];
        const sqlParams: string[] = [];

        if (id_medico !== undefined) {
            updateFields.push(`id_medico = $${sqlParams.length + 1}`);
            sqlParams.push(id_medico);
        }

        if (nombre !== undefined) {
            updateFields.push(`nombre = $${sqlParams.length + 1}`);
            sqlParams.push(nombre);
        }

        if (apellido_paterno !== undefined) {
            updateFields.push(`apellido_paterno = $${sqlParams.length + 1}`);
            sqlParams.push(apellido_paterno);
        }

        if (apellido_materno !== undefined) {
            updateFields.push(`apellido_materno = $${sqlParams.length + 1}`);
            sqlParams.push(apellido_materno);
        }

        updateQuery += ' ' + updateFields.join(', ');
        updateQuery += ' WHERE id_medico = $' + (sqlParams.length + 1);

        sqlParams.push(id);

        try {
            await this.pool.query(updateQuery, sqlParams);
            return res.status(200).json({ message: `Medico con id ${id} actualizado correctamente` });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}