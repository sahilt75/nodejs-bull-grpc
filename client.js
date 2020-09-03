var grpcConfig = require('./grpc_config')
var grpc = require('grpc')

var client = new grpcConfig.invoicing.Invoicing('localhost:50051',
                                       grpc.credentials.createInsecure());


var invoice_details = {
    id: '1123',
    name : 'John Doe',
    email : 'sahilthakkar64@gmail.com',
    amount : '$2500'
}
client.mailInvoice(invoice_details,(err,message)=>{
    console.log(`Mail Invoice queuing status : ${message.status}`)
})