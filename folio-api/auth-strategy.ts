/**  
 permission: {routeId}.crud,{routeId}.crud
1) put it inside jwt access token roles,
2) when a user is given a role. a particular role as above is asigned 
 at the point of creation or at the point or new asignment.
3) when a user is asigned two different roles, roles reconciliation is 
 done to avoid duplicating route roles. this can be done using the roles
 table

5) roles will be defined in roles table with
associated permissions like permission
6) routes like {routeName: routeId, routeName: routeId} will be 
saved on file to be used on the front end. this will have to happen
only when a new route is created, deleted or updated

6) in the roles table, each name will have permission 
7) we need a way to still give each individual extra permissions
on some routes apart from the general permission

*/
