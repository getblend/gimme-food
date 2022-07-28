## API Requirements for initial POC

| #   | type         | name                                         | returns            | description                                                    |
| --- | ------------ | -------------------------------------------- | ------------------ | -------------------------------------------------------------- |
| 1   | query        | posts                                        | PostCollection     | returns the list of posts                                      |
| 2   | query        | post                                         | PostType           | a single post                                                  |
| 2.1 | field        | - store                                      | Store              | returns a single store                                         |
| 3   | query        | menuItem                                     | MenuItem           | a single menu item                                             |
| 4   | query        | stores                                       | StoreCollection    | returns a list of stores                                       |
| 5   | query        | store                                        | Store              | returns a single store                                         |
| 5.1 | field        | - deliveryTime(location: GeoLocation)        | ISODateTime        | returns the delivery time based on the location from the store |
| 5.2 | field        | - menu(pageArgs: PaginationArgs)             | MenuItemCollection | returns a list of menuItems for the specific store             |
| 5.3 | field        | - summary                                    | StoreSummary       | returns a summary of the store contents                        |
| 6   | query        | orders                                       | OrderCollection    | returns a collection of orders                                 |
| 7   | query        | order                                        | Order              | return a single order                                          |
| 8   | query        | cart                                         | Cart               | return the cart for the user                                   |
| 9   | query        | address(latitude: string, longitude: string) | Address            | returns the address based on lat and long                      |
| 11  | query        | currentUser                                  | User               | returns the current logged in user                             |
| --- | --------     | -------------------------------------------- | ------------------ | -------------------------------------------------------------- |
| 12  | mutation     | createUser(input: UserProfileInput)          | User               | creates a user for the app                                     |
| 13  | mutation     | saveAddress(input: AddressInput)             | Address            | saves an address                                               |
| 14  | mutation     | createPost(input: PostInput)                 | Post               | creates and uploads the blobs and saves a post                 |
| 15  | mutation     | addToCart(input: CartInput)                  | Cart               | creates or updates a cart                                      |
| 16  | mutation     | checkout(input: CartInput)                   | Order              | creates or updates an order                                    |
| 17  | mutation     | cancelOrder(input: OrderCancellationInput)   | Order              | cancels the order                                              |
| 18  | mutation     | increment(input: CartQuantityInput)          | Cart               | increments an item in the cart                                 |
| 19  | mutation     | decrement(input: CartQuantityInput)          | Cart               | decrements an item in the cart                                 |
| 20  | mutation     | deleteUser(input: DeleteUserInput)           | void               | deletes all user data from the system                          |
| --  | --           | -                                            | --                 | -                                                              |
| 21  | subscription | trackingStatus(orderId: ID)                  | OrderDelta         | returns the information that has changed on the order          |

## API Addtionals
