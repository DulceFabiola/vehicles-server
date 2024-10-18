import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

const VehicleTypeType = new GraphQLObjectType({
    name: 'VehicleType',
    fields: {
        VehicleTypeId: { type: GraphQLInt },
        VehicleTypeName: { type: GraphQLString },
    },
});


export const VehicleDataType = new GraphQLObjectType({
    name: 'VehicleData',
    fields: {
        makeId: { type: GraphQLInt },
        makeName: { type: GraphQLString },
        vehicleTypes: { type: new GraphQLList(VehicleTypeType) }, // Usando el tipo VehicleType
    },
});
