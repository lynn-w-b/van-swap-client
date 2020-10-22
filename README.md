# Van Swap - get off the beaten track

<br>

## Description

This is an app to match camper van owners with each other to swap vans so that they can holiday for free in places they cannot drive to.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **About** As a user I can read information about ther van swap app and how it works
-  **FAQ** As a user I can read frequently asked questions about the app
-  **Contact** As a user I can send an email to the app owners if I cannot find an anwer to my question
-  **Signup:** As an anon I can sign up in the platform so that I can start searching for vans and advertising my own van for swaps
-  **Login:** As a user I can login to the platform so that I can search for vans and receive swap proposals
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add User Profile** As a user I can add a user profile
-  **Edit/Delete User Profile** As a user I can edit or delete my user profile
-  **Add Van Profile** As a user I can add my van profile to advertise it for swaps
-  **Edit/Delete Van Profile** As a user I can edit or delete my van profile 
-  **View Vans** As a user I want to see the list of vans available for swaps
-  **Search Vans** As a user I can filter the list of vans available for swaps by location
-  **Van Details** As a user I can view complete details of a particular van and its owner
-  **Swap Request** As a user I can complete a swap request for a particular van and send this to another user for approval
-  **View Swap Requests** As a user I can see swap requests and either accept or decline them

## Backlog

User profile:
- add user/van reviews
- add more filter options when searching vans e.g. make and model, type or date
- add Map API for alterntaive van search method
- allow users to write blog posts about their travels
- allow users to chat/send messages directly to one another


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public `<Route>`            | Splash page                                                  |
| `/about`                  | AboutPage            | public `<Route>`            | Shows further information about app and hot it works         |
| `/about/faq`              | FAQPage              | public `<Route>`            | Shows FAQs about the site                                    |
| `/error`                  | ErrorPage            | public `<Route>`            | Shows error message                                          |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup|
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, navigate to homepage after login                 |
| `/home`                   | UserProfilePage      | user only `<PrivateRoute>`  | Shows user profile and any van swap requests                 |
| `/home/:id/add`           | AddProfilePage       | user only `<PrivateRoute>`  | Adds a user profile for new users                            |
| `/home/:id/edit  `        | EditProfilePage      | user only `<PrivateRoute>`  | Edits a user profile                                         |
| `/home/:id/delete`        | DeleteProfilePage    | user only `<PrivateRoute>`  | Deletes a user profile                                       |
| `/van/:id`                | VanProfilePage       | user only `<PrivateRoute>`  | Shows van profile                                            |
| `/van/:id/add`            | AddVanProfilePage    | user only `<PrivateRoute>`  | Adds a van profile                                           |
| `/van/:id/edit`           | EditVanProfilePage   | user only  `<PrivateRoute>` | Edits a van profile                                          |
| `/van/:id/delete`         | DeleteVanProfilePage | user only `<PrivateRoute>`  | Deletes a van profile                                        |
| `/allvans`                | AllVansPage          | user only `<PrivateRoute>`  | Shows all vans available for swaps                           |
| `/allvans?location`       | FilteredVansPage     | user only  `<PrivateRoute>` | Shows vans filtered by location                              |
| `/vandetails/:id`         | VanDetailsPage       | user only  `<PrivateRoute>` | Shows full details of one particular van                     |
| `/vanswaprequest/:id`     | SwapRequestPage      | user only `<PrivateRoute>`  | Allows use to accept or decline request swap request         |


## Components

- SplashPage

- AboutPage

- FAQPage

- ErrorPage

- LoginPage

- SignupPage

- UserProfilePage

- AddProfilePage

- EditProfilePgae

- DeleteProfilePage

- VanProfilePage

- AddVanProfilePage

- EditVanProfilePage

- DeleteVanProfilePage

- AllVansPage

- FilteredVansPage

- VanDetailsPage

- SwapRequestPage

- Navbar

- Footer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Van Service
  - van.list()
  - van.filter()
  - van.detail(id)
  - van.add(id)
  - van.delete(id)
  - van.edit(id)
- User Service 
  - user.detail(id)
  - user.add(id)
  - user.delete(id)
  - user.edit(id)
- Swap Service
  - Swap.put(id)
  - Swap.edit(id)
<br>

## Links

### Trello/Kanban

[Van Swap trello board](https://trello.com/b/B24pd2i8/van-swap) 


### Git

The url to your repository and to your deployed project

[Front-end repository Link](https://github.com/lynn-w-b/van-swap-client)

[Server repository Link](https://github.com/lynn-w-b/van-swap-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Van Swap Slides](https://docs.google.com/presentation/d/1rz0FCZhx9SKnHqKoFFHeDqkVtWUyveraPv7WBL02TyA/edit?usp=sharing)
[Wireframes](https://www.figma.com/proto/FXTohkjAiYU6iRQCw49OAq/WireFrames?node-id=1%3A3&scaling=scale-down)
