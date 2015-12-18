# react-redux-system-starter
*not* setup as isomorphic

*Note:* This was originally intended to use jspm / system.js; however, because that project is still tied to babel 5.2.8 at the time of this writing, the project is using Browserify.  Expect this to change at some point in the future.

This is a rough outline of a project setup with:

* Airbnb eslint config
* Babel 6.1.2
* gulp
* browserify

TODO:

- [x] Add react router
- [ ] Integrate react-router into redux state using redux router
- [x] Add some async actions
- [ ] Follow [this issue](https://phabricator.babeljs.io/T2645) and upgrade babel version when appropriate to get decorator support back
- [ ] Implement PostCSS or SASS
- [ ] Implement some smart and dumb components
  * Redux explanation [here](http://redux.js.org/docs/basics/UsageWithReact.html)
  * Generic React best practice explanation [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
  * In this project, "container" components "connect" the store to props, and "presentation" components are store-agnostic
- [x] Fix the Gulpfile
- [ ] Add in other requisite tasks to support SASS / PostCSS
- [ ] Add basic assets such as a favicon
