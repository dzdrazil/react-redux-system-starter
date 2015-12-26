# react-redux-system-starter
*not* setup as isomorphic

*Note:* This was originally intended to use jspm / system.js; however, because that project is still tied to babel 5.2.8 at the time of this writing, the project is using Browserify.  Expect this to change at some point in the future.

This is a rough outline of a project setup with:

Tools:

* Airbnb eslint config
* Babel 6.1.2
* gulp
* browserify

Libraries:

* React
* react-router
* [Redux](http://rackt.org/redux/)
* [redux-simple-router](https://github.com/rackt/redux-simple-router) (exposes an action to invoke route changes)
* [tcomb](https://github.com/gcanti/tcomb) (provides immutable, typed objects and collections)
* [tcomb-form](https://github.com/gcanti/tcomb-form) (provides form markup validation, validation and error styling based on tcomb types)
* [axios](https://github.com/mzabriskie/axios) (for making AJAX requests)

Reducing boilerplate:

* redux-create-router (more or less copied from the [reducing boilerplate](http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html) tutorial)
* src/scripts/actions/createAsyncActions.js
    * this one is a hand-rolled action creator function, unlike common middleware solutions such as [redux-async-flow](https://www.npmjs.com/package/redux-async-flow) or [redux-combine-actions](https://www.npmjs.com/package/redux-combine-actions)
    * It's used primarily to demo how easy it is to roll your own, and depending on your taste you may want one of the above two instead

Totally tangential additions:

* [swagger-mock-api](https://github.com/dzdrazil/swagger-mock-api) because it's handy
* watch-based building and live reloading via `gulp --watch`

TODO:

- [x] Add immutable support (note: done with the delightful [tcomb](http://gcanti.github.io/tcomb/index.html) )
- [x] Add react router
- [x] Integrate react-router into redux state using redux router
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
