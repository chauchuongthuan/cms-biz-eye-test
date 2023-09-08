import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';
 
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
 
  const http = httpLink.create({
    uri: environment.BASE_URL_GRAPHQL
  });
 
  const ws = new WebSocketLink({
    uri: environment.BASE_URL_WS,
    options:{
      reconnect:true
    }
  });
 
  const link = split(
    ({query}) => {
      const data = getMainDefinition(query);
      return (
        data.kind === 'OperationDefinition' && data.operation === 'subscription'
      );
    },
    ws,
    http
  )
 
  return {
    link: link,
    cache: new InMemoryCache(),
  };
}
 
@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}