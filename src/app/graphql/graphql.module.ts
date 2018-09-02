import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/shared/auth.service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    ApolloModule,
    AuthModule,
    HttpClientModule,
    HttpLinkModule
  ],
})
export class GraphqlModule {
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private httpLink: HttpLink
  ) {
    const token = this.authService.getIdToken();

    // Create a HTTP link.
    const http = httpLink.create({ uri: environment.apollo.uri });

    const auth = setContext((_, { headers }) => {
      let result = { };

      if (token) {
        const authorization = `Bearer ${token}`;

        result = {
          headers: (headers) ?
            headers.append('Authorization', authorization) :
            new HttpHeaders().append('Authorization', authorization)
        };
      }

      return result;
    });

    // Create a WebSocket link.
    const webSocketLink = new WebSocketLink({
      options: {
        connectionParams: () => {
          return { authToken: token };
        },
        lazy: true,
        reconnect: true
      },
      uri: environment.apollo.ws
    });

    // Split links depend on operation type.
    const link = split(
      ({ query }) => {
        const operationDefinition = getMainDefinition(query);
        return (
          !!operationDefinition &&
          operationDefinition.kind === 'OperationDefinition' &&
          operationDefinition.operation === 'subscription'
        );
      },
      webSocketLink,
      http
    );

    apollo.create({
      cache: new InMemoryCache(),
      link: auth.concat(link)
    });
  }
}
