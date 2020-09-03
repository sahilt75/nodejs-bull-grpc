var grpcConfig = require('./grpc_config')
var grpc = require('grpc')
var consumer = require('./consumer')

function queueMailInvoice(invoice_details){
    const data = {
        invoice_details: invoice_details
    };
    consumer.sendMailQueue.add(data);
    message = {
        status : 'success'
    }
    return message
}
function mailInvoice(call,callback) {
    callback(null, queueMailInvoice(call.request));
}

function getServer() {
    var server = new grpc.Server();
    server.addService(grpcConfig.invoicing.Invoicing.service, {
      mailInvoice: mailInvoice,
    });
    return server;
  }


var invoiceServer = getServer();
invoiceServer.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
invoiceServer.start()
