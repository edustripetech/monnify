const getAxiosInstance = require('./utils/axios');
const config = require('./config');

const user = {
  id: 1,
  name: 'Esho, Tolulope',
  email: 'esho.tolu@edustripe.com'
}

// Reserving an account
function reserveAccount() {
  const accountData = {
    accountReference: `${user.name}'s reserved-account`,
    accountName: user.name,
    currencyCode: "NGN",
    contractCode: config.monnifyContractCode,
    customerEmail: user.email,
    customerName: user.name,
  };

  return new Promise(function (resolve, reject) {
    getAxiosInstance()
      .then(function (axiosInstance) {
        axiosInstance.post('/bank-transfer/reserved-accounts', accountData)
          .then(function ({ data }) {
            return resolve(data);
          })
          .catch(function (err) {
            return reject(err);
          })
      });
  })
}

// demo the reserve account endpoint
// reserveAccount()
//   .then(function (data) {
//     console.log(data);
//   });

// The response from the above
/*
  {
    requestSuccessful: true,
    responseMessage: 'success',
    responseCode: '0',
    responseBody: {
      contractCode: '2973248496',
      accountReference: "Esho, Tolulope's reserved-account",
      accountName: 'Esho, Tolulope',
      currencyCode: 'NGN',
      customerEmail: 'esho.tolu@edustripe.com',
      customerName: 'Esho, Tolulope',
      accountNumber: '4000047339',
      bankName: 'Providus Bank',
      bankCode: '101',
      collectionChannel: 'RESERVED_ACCOUNT',
      reservationReference: 'XJWVJ5V9WTLJWT3CLD74',
      reservedAccountType: 'GENERAL',
      status: 'ACTIVE',
      createdOn: '2020-08-22 17:12:55.411',
      incomeSplitConfig: [],
      restrictPaymentSource: false
    }
  }
*/
