# Star Wars Universe Explorer

![Star Wars Logo](src/images/image.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

The test files can be found in the '**tests**' directory.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Features implemented

- Displays a list of Star Wars characters with basic information
- Allows users to view detailed information about a selected character
- Shows related data for the selected character (e.g., homeworld, species)
- Implemented Recoil for state management
- Handle UI states appropriately (loading, errors, empty states)
- Apply responsive design principles for different screen sizes
- `Stretch Goal`: Implemented a simple UI theme switcher (light/dark mode)

### Responsive design breakpoints

The following break points goes as follows and more:

- Iphone 14 Pro Max
- Iphone 12 Pro
- Iphone XR
- Iphone SE
- Samsung Galaxy S8+
- Samsung Galaxy S20 Ultra

### Approach

###### Technologies: React, Recoil, TypeScript, and Swiper.js, with test coverage via Jest and React Testing Library

Yeah, so the moment I read the assignment instructions and saw that I would be working with a list of Star Wars characters and rendering them to the UI, I immediately knew I wanted to implement some type of album-style swiper.

With that in mind, I created a simple CharacterCard component that allows users to manually swipe through each character returned from https://swapi.info/documentation.

The specific endpoint I used is: https://swapi.info/api/people.
The /people endpoint returns all the characters along with the related resources for each one.

Using this approach, I was able to fetch the data and store it in Recoil state.

One of the benefits of Recoil is that we can store data in an atom, and once that data is available, we can access it in any component eliminating the need to prop drill through child components.

`Components`:

- App handles the routes for navigating between the character list page and the character detail page, as well as contains the light/dark mode switch.
- Character list, fetches the character data and stores the data into recoil state.
- Character card, is responsible rendering a UI card for a single Star Wars character
- character detail page, is responsible for displaying detailed information about a single Star Wars character, including additional related data such as their homeworld, species, and starships.

### Challenges

- As of React 18+, Create React App (CRA) has limited support and slow updates. Many libraries (like Swiper or React Router) are rapidly evolving, but CRA is no longer keeping up due to lack of active maintenance.
  - This led me down a deep rabbit hole, trying to get the unit tests to run properly without failing, as well as having to downgrade specific dependencies due to the lack of support.

I mentioned that it was not ideal, however I ended up downgrading to an an older version of react for Recoil and swiper dependencies to work properly.
