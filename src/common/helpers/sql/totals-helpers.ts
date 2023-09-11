import sequelize, { Op } from 'sequelize';
import { CashFlow } from '../../../cashflow/entities/cashflow.entity';

export async function calculateSumByTransactionTypeAndCurrency(
  transactionType: string,
  column: string,
  returnString: boolean,
  dateFrom: string,
  dateTo: string,
  entity = '',
) {
  const whereClause: any = {
    transactionType,
    currency: ['Bs', '$', '€'],
    isTemporalTransaction: false,
  };

  if (dateFrom !== '' || dateTo !== '') {
    whereClause.date = {
      [Op.between]: [dateFrom || null, dateTo || null],
    };
  }

  if (entity !== '') {
    whereClause.entity = entity;
  }

  const results = await CashFlow.findAll({
    attributes: ['currency', [sequelize.fn('SUM', sequelize.cast(sequelize.col(column), 'decimal')), 'sum']],
    where: whereClause,
    group: ['currency'],
  });

  const sumsByCurrency = {};
  results.forEach((result) => {
    const currency = result.getDataValue('currency');
    const sum = parseFloat(result.getDataValue('sum')) || 0;
    sumsByCurrency[currency] = sum;
  });

  return {
    bs:
      sumsByCurrency['Bs'] && returnString
        ? sumsByCurrency['Bs'].toString()
        : sumsByCurrency['Bs'] && !returnString
        ? sumsByCurrency['Bs']
        : null,
    usd:
      sumsByCurrency['$'] && returnString
        ? sumsByCurrency['$'].toString()
        : sumsByCurrency['$'] && !returnString
        ? sumsByCurrency['$']
        : null,
    eur:
      sumsByCurrency['€'] && returnString
        ? sumsByCurrency['€'].toString()
        : sumsByCurrency['€'] && !returnString
        ? sumsByCurrency['€']
        : null,
  };
}
