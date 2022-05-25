import {MigrationInterface, QueryRunner} from "typeorm";

export class parkingDb1653500231918 implements MigrationInterface {
    name = 'parkingDb1653500231918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`montant\` int NOT NULL, \`phone\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`date_debut\` datetime NOT NULL, \`date_fin\` datetime NOT NULL, \`transation_id\` varchar(255) NOT NULL, \`transaction_url\` varchar(255) NULL, \`parking\` varchar(255) NULL DEFAULT 'AEROPORT DE COTONOU', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`payments\``);
    }

}
