var grpc = require('grpc')
var PROTO_PATH = __dirname + '/protos/invoice.proto';

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var invoicing = grpc.loadPackageDefinition(packageDefinition).invoicing;

exports.invoicing = invoicing