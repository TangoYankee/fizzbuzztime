# FizzBuzzTime
Start, stop and reset a timer; also view total elapsed time

## Production Deployment
### Live website
A branded version of the website is availale at https://tangoyankee.io/fizzbuzztime.

### Local version
The application comes prebuilt in the `/dist` folder. In order to view it on a local computer:
- Navigate into the `/dist` folder.
- Once in the `/dist` folder, find the `index.html` file. 
- Double click on the `index.html` file, or select it and press enter.
  - It should open in the computer's default web browser. For best support, use Chrome or Firefox.  

*Alternate Method*  
If the file does not open automatically, copy the full path of the `index.html` file and paste it into the navigation bar of a web browser. 

## Development Deployment
The application is bundled using webpack and babel. A development server is available with Node.

1. [Install Node](https://nodejs.org/en/download/) using the instructions appropriate to the development machine
2. Install all dependencies  
`npm i`
3. Run available scripts as desired

### Available scrips

`npm run build`  
Build a production ready bundle of the application. 
Files are sent to `/dist` folder  

`npm run watch`  
Have webpatch monitor the repository for changes during development.
View the application by opening the `index.html` from the `dist` in a browser. Refresh the browser to view any changes.

`npm run start:dev`  
Run a Node development server. The site will render at `localhost:9000/`.  
The webpage will automatically refresh on source code updates.

`npm run lint`  
View linting errors

`npm run lint-fix`  
Allow linter to automatically fix errors, when able

`npm run test`  
Run full test suite and recieve coverage report

`npm run test:watch`  
Request Jest monitor for changes.  
When a test is updated, Jest will automatically rerun the changed tests.


## Technology
### Production
- [Reactjs](https://reactjs.org)

### Development
- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Eslint](https://eslint.org/)

## Timer Implementation
Publicly available implementations of Timers and Counters in React, [including the React Documentation](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class), tend to initialize a counter and then update it based on an interval. This implementation is satisfactory to
demonstrate lifecycles. However, the timer itself is [susceptible to drifting](https://johnresig.com/blog/how-javascript-timers-work/) because the interval occurs *after a* second rather than *exactly every* second.

For FizzBuzzTime, the application records the Date whenever time the user clicks the start or stop button. This results in a list of start and stop times. Elapsed time is calculated by finding the differences in the
start and stop times. If the time is still moving, the current time is used in place of a final stop time. 
When the timer is reset, a new blank list is created to hold a new list of start and stop times. 

in addition to being more reliable, this method provides more options to work with the data. The recorded user interactions could be logged to a database in order to study user interactions. Additionally, the date lists could be used in a "history" feature that allows users to navigate through timers they've used in the past.

## Future improvements
1) Text that appears in the site could be extracted into a separate content manager. This could help decouple the text of the site with the logic of how it is displayed. This makes it easier for content managers and developers to independently fulfill their responsibilities.

2) Webpack offers a feature to [split code into separate bundles](https://webpack.js.org/guides/code-splitting/). This improves initial load times. It may also
prevent resources from loading unneccessarily. For this site, the `Timer` component is loaded along with the `Values` Component. However, it is not seen until the user clicks the `Go to Timer >` button. This is a potential place to split the code, only loading the `Timer` component after the user navigates there.

## Accessibility note
The css dimensions in the project specifications were listed in pixels. From an accessibility standpoint, [advocates](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/) generally recommend using relative units, as they allow users to scale the website
using font settings. To make the conversion from REM to PX easier, the root font size (traditioally 16px) is scaled at 62.5%. This means the default
scale for this site is 1.0rem to 10px.

Additionally, the start and stop buttons were flagged by the [Wave Accessibility Tool](https://wave.webaim.org/) for having low contrast. This could be
resolved by increasing the contrasting between the font and background, or increasing the default font size.
