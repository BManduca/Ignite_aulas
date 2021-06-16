import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  //miragejs tem um banco de dados interno que pode utilizar
  //declarando uma propriedade chamada models
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1, 
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-06-10 09:00:00')
        },
        {
          id: 2, 
          title: 'Aluguel 06/2021',
          type: 'withdraw',
          category: 'Moradia',
          amount: 920,
          createdAt: new Date('2021-06-08 11:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    //request são os dados que estão sendo enviados para a nossa transaction
    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
