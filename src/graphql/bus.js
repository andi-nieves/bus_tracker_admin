import {gql} from '@apollo/client';

export const BUS_LIST_QUERY = gql`
  query {
    allBus {
      bus_id
      bus_name
      passenger_count
      departure
      arrival
      createdAt
      updatedAt
    }
  }
`;

export const BUS_QUERY = gql`
  query Coordinates($bus_id: String!) {
    coordinates(bus_id:$bus_id) {
      id
      bus_id
      latitude
      longitude
      createdAt
    }
  }
`;

export const NEW_BUS = gql`
    mutation CreateBus($bus_id:String!, $bus_name:String!, $departure:String!, $arrival:String!) {
        createBus(newBus:{
            bus_id:$bus_id,
            bus_name:$bus_name,
            departure:$departure,
            arrival:$arrival
        }) {
            bus_id
            bus_name
            passenger_count
            departure
            arrival
            createdAt
        }
    }
`

export const DELETE_BUS = gql`
mutation DeleteBus($bus_id:String!) {
    deleteBus(bus_id:$bus_id) {
      response
    }
  }
`