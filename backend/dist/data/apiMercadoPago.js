"use strict";
[
    {
        'este es': 'comprador',
        id: 1065516836,
        nickname: 'TETE6015490',
        password: 'qatest7954',
        site_status: 'active',
        email: 'test_user_72113555@testuser.com',
    },
    {
        'este es': 'vendedor',
        id: 1065517179,
        nickname: 'TEST0MAEHG1I',
        password: 'qatest3386',
        site_status: 'active',
        email: 'test_user_50488233@testuser.com',
    },
];
// data from notification
const as = {
    action: 'payment.created',
    api_version: 'v1',
    data: {
        id: '1245792731',
    },
    date_created: '2022-02-02T21:36:21Z',
    id: 100776048512,
    live_mode: false,
    type: 'payment',
    user_id: '1065517179',
};
/* (
  'ACCESS_TOKEN= TEST-5936203418462777-013005-c5caa8ba7ec211de69be12319b29a579-1065517179'
);
('de 1065517179'); */
// http://localhost:4000/api/orders/61eae7d7c43ed359eacd1ceb/mercadopago/success?collection_id=1245755073&collection_status=approved&payment_id=1245755073&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4060786260&preference_id=1065517179-273d39e1-bf86-41b7-ac67-b70165ca1469&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
//# sourceMappingURL=apiMercadoPago.js.map