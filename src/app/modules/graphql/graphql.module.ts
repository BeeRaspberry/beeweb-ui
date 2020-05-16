import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { AuthService } from '../../core/authentication/auth.service';
import { AppConfigService } from '../../core/services/app-config.service';

export function createApollo(httpLink: HttpLink, authService: AuthService, configService: AppConfigService) {

  // Workaround "Unrecognized input fields '__typename' for type..." error
  // https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645  
  const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation).map((data) => {
      return data;
    });
  });

  const authLink = new ApolloLink((operation, forward) => {

     // Get the authentication token from our authService if it exists
     const token = authService.authorizationHeaderValue; 

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'Authorization': token ? token : ''
      }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  console.log('Apollo Link ' + configService.getApiURL());
  return {
    link: cleanTypeName.concat(authLink.concat(httpLink.create({ uri: configService.getApiURL() }))),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService, AppConfigService],
    },
  ],
})
export class GraphQLModule { }