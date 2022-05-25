import { BadRequestException, Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FedaPay, Transaction } from 'fedapay';
import { Repository } from 'typeorm';
import { PayementDto } from './payement_dto';
import { Payment } from './payment.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Payment) private payementService: Repository<Payment>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async pay(body: PayementDto) {
    /* Remplacez VOTRE_CLE_API par votre véritable clé API */
    FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);

    /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
    FedaPay.setEnvironment(process.env.FEDAPAY_MODE); //ou setEnvironment('live');

    /* Créer la transaction */
    const transaction = await Transaction.create({
      description: 'Description',
      amount: body.montant,
      // callback_url: 'http://localhost:3000/api/verify/',
      currency: {
        iso: 'XOF',
      },
      customer: {
        firstname: 'Parking Aéroport de Cotonou',
        lastname: 'HOMINTEC',
        email: `homintec${body.phone}@gexample.com`,
        phone_number: {
          number: body.phone,
          country: 'BJ',
        },
      },
    }).catch((error) => {
      console.log(error.httpResponse.data);
      throw new BadRequestException(error.httpResponse.data);
    });
    console.log('Reponse de la  transaction', transaction);
    const result = await transaction.generateToken();
    console.log('token', result);

    const token = result['token'];
    const mode = 'mtn'; // 'mtn', 'moov', 'mtn_ci', 'moov_tg'
    const response = await transaction
      .sendNowWithToken(mode, token)
      .catch((error) => {
        console.log(error.httpResponse.data);
        throw new BadRequestException(error.httpResponse.data);
      });

    const answer = await Transaction.retrieve(
      response['payment_intent']['intentable_id'],
    ).catch((error) => {
      console.log(error.httpResponse.data);
      throw new BadRequestException(error.httpResponse.data);
    });
    if (answer.status == 'approved') {
      const payement = {
        ...body,
        transation_id: answer.id as string,
        transaction_url: answer.receipt_url as string,
      };
      const saved = await this.payementService.save(payement);

      console.log(saved);
      //save the answer here;
      return saved;
    }
    throw new BadRequestException({ payement: response, verifier: answer });
  }

  async verify(id: string) {
    FedaPay.setApiKey('sk_sandbox_4Kzo2c1yfn71g8nfr0k-V4UH');
    /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
    FedaPay.setEnvironment('sandbox'); //ou setEnvironment('live');

    const transaction = await Transaction.retrieve(id).catch((error) => {
      console.log(error.httpResponse.data);
      throw new BadRequestException(error.httpResponse.data);
    });
    console.log(transaction);

    if (transaction.status == 'approved') {
      return transaction;
    }
    throw new BadRequestException(transaction);
  }

  getAll() {
    return this.payementService.find();
  }
}
