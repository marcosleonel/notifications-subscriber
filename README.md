# NOTIFICATION SUBSCRIBER

A notification system that has the ability to receive a message and depending on the category and subscribers, notify these users in the channels they are registered.

## FOLDER STRUCTURE

```bash
db
components
  |_user
  |_subscription
  |_task
config
logger
server
```

## COMPONENT STRUCTURE

* **Index**: the place to import the component dependencies to inject and export the component.
* **componentEntity**: validate the component fields (business logic) (domain).
* **componentUseCases**: a class with all the component's use cases.
* **componentControllers**: handles the component`s routes.
* **componentRepository**: interface to persist the component data.
* **componentModel**: a database model that will be injected in the repository.
* **componentsRoutes**: the routes that will be exported to the router.
* **component.unit.spec**: one unit test for each file.
* **component.integration.spec**: integration test for the route.

## TODO
[ ] Sent notifications concurrently using Promise.all

### SERVER

[ ] Healthy Check
[ ] Custom Logger
[ ] Graceful Shutdown
[ ] 404 Response
