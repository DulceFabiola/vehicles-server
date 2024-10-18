import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import { VehicleDataType } from '../graphql/types';
import DatabaseService from '../services/databaseService';

const dbService = new DatabaseService();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        vehicles: {
            type: new GraphQLList(VehicleDataType),
            resolve: async () => await dbService.getVehicleData(),
        },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});
