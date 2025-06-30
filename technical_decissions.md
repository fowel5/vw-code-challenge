# Project

In this file I will list (hopefully) all the technical decisions such as how do I manage git, how do I create my DataTable, which Components can I reuse or why Wailwind?

## Git

I decided to use this branching strategy I used, because it is more efficient while working in a big team. The conventional commits and branches help not only to work more organized, but also to tease in every branch/commit what you are doing or have done. It is really useful when creating changelogs on versioning, because you fetch the commit message and list it. In the list will appear which changes you have done and the PR-Link pointing to it.

## Architecture

I like to set different folders for different uses, and so did I.

- Root: In the root folder I keep only config files. Those should not be modified unless some config has to be changed.
- cypress: It contains the cypress tests and necessary config files.
- jsonserver: It contains the db.json, where the students are saved.
- src: In the src folder I keep every single subfolder, containing parts of the application.
- src/api: Every file containig API-Requests is placed here.
- src/components: This folder is reserved for the function/components/files, that render something visible on the browser.
- src/helpers: Only the files/functions that are implemented to resolve a specific use case is placed here.
- src/hooks: All custom hooks used in the project have to be placed in this folder.
- src/logic (I may change rename it to context): Every file that contains logic or context is placed in here.
- src/types: Every type definition belongs here.
- src/utils: Only functions/files with general purposes are placed in here. The difference with helpers is, that the utils solve general problems and can be mostly reused. The helpers just solve an specific use case.

## Technologies

I will explain here, from a technical point of view, why I chose specific technologies (not all, but few of them)

### Vite

I used vite because it bundles really fast and has Hot-Module-Replacement, which enhances the Developer-Eyperience a lot. When the application becomes huge, you thank the fast bundle times, eventhough in this project it can be dismissed.

### Tailwind

As I said in the README, I am more used to CSSinJS libraries. The code looks much cleaner with libraries like styled-components or emotion. The problem is, that I do not like it in cliend-side react applications. Styled-components need a lot of execution time when the app grows, and without SSR, I can not render the styles in the server and inline it into the HTML (I do not like extra downloading a blocking module like css-files), which is my preffered variant. Another problem is, rendering a component and executing styled-components (and injecting the CSS dynamically), causes shifts. Shifts = Bad User Experience. So, I used Tailwind, which is a lightweight library for styling components and does not cause shifts. So, summarizing the paragraph, I traded performance for developer-experience by using Tailwind.

### Vitest & Cypress

Vitest: As I said in the README, I used vitest (to be honest, it was just to learn it, I develop test faster with jest) to test the components at the start. It saved me a few times to not break the code and that is because I tested the right things (hook, provider and datatable). After that, I realized I had not enough time to do all I wanted to do and stopped doing it.

Cypress: I got it recommended and, after reading the guide, I wanted to give it a try because it was, what I needed. I wanted to test the entire flow of the app and check, that everything happens as it happens. I could have done it with Playwright, I liked the way the UI of Cypress looked like and I chose it for that reason. As soon as I had a complete functional app, I created the e2e-tests. But I recommend doing it at the start and update the test file every time a new behaviour is implemented to avoid unexpected side effects.

Github Actions: As soon as I had the tests, I created a Github Action to check that everything works well. On every PR, that is going to be merged into dev, it checks if something failed. If it fails, I will not be able to merge the code into dev.

## AI

AI was specifically used in this project ONLY to write boilerplate code, mocks and the header logo. After generating the Code, it was reviewed by me and always modified to accomplish my intentions. The model used was GPT-4.1. After getting the logo from GPT-4.1, I started using the color schema on my components, creating with it a kind of harmony in the UI.

## Technical decissions

### Datatable

I did not want to have actions in the table for edit, remove or view, because if I have a lot of rows, I will have e.g. 3 Icons for every row. If there is 100 rows, I would have 300 icons and it does not look good. I did prefer the rows to be clickable, and if you want to perform some changes, you will do it in the ShowCase-Page.

### Search Bar

I decided here not to instantly search for the input value, but for using a debounced value. It is helpful to avoid the shifts in the table after every keystroke and, if I would like to filter for the value via API, it would not fire a request to the server every time I press a key, just when I stop pressing keys.

### Pages

For an scalable application I like to create a folder named "pages", which contains the pages that render the corresponding components. It would have added an extra layer of logic/complexity and I decided just to use a LayoutWrapper to set some global styles and directly render the component.

### Reusable Components

#### StudentForm

I created a student form, where you can input some data from a student. The data input happens when you create a student and when you edit it, so, I decided to code the component to keep it reusable.

#### Overlay

It is a general purpose overlay, that gets a function when it has to be closed, and can render ReactNodes in him. So, it is reusable for showing a popup.

#### Utils

The files in utils are designed to have general purposes, so, we can use the sort or filter functions on different type of objects or arrays.

#### useDebounce

The useDebounce hook is also a general purpose hook, which sets a delay to a state before triggering the change when using the debouncedValue. It can also be used on every state value, that we want to debounce. All the operations based on the debouncedValue will be delayed in the time we provide.

## Performance Optimizations

### Done Optimizations

The optimizations are in PRs, not merged in the final code.

- In https://github.com/fowel5/vw-code-challenge/pull/30 I show, how the bundle would look like with lazy-imports of the routes, which leads to almost nothing of code separated from the main bundle.

- In https://github.com/fowel5/vw-code-challenge/pull/35 I show aswell, that, if you configure the bundler that way, you can separate the bundle into several little chunks, where every chunk (mostly) corresponds to the transpiled files I used in the project.

- Accessibility: If a form (create or edit student) is not ready to be saved, I disabled the button. Whenever it is all filled out, the button is enabled and can be clicked. This was done in https://github.com/fowel5/vw-code-challenge/pull/31 .

### Potential Optimizations

- Stop using .png images: PNG images are heavier than other type of images like Webp or Avif. I would have used an avif image and cropped it in order to have an image that matches the size of the place where I want to render it.

- Middleware: Since I do not like that much full-client-side React, I would set a middleware, which initially renders the html and the react code, and delivers the html already prerendered with react. It would be really helpful for SEO-Purposes. (I would have also liked to start with a SSR-Framework to accomplish that).

- Preload image: If we set a middleware or something that renders react before serving the page, we could preload the image. That means, that the browser does not need to download and execute react before being able to load an image, it would have it embed in the HTML-Head with a link-rel-preload, gaining with it a better UX feeling and potentially enhanced Core Web Vitals (I am assumming the image on a homepage is the LCP).

- CDN: I would place every asset in some CDN like Akamai or Cloudflare and set a TTL. With it the application would be delivered much faster.

- Accessibility: It would have been nice to implement ARIA-Roles and navigation tab based navigation so everyone can use the app, but I am not into all this optimizations (I have my formation in 2 weeks).

- Developer Experience: I would have outsourced the Tailwind classNames, that are being repeatedly used and outsourced it in a external file, so we can just use the name of the variable containing all the Tailwind directives and use it instead.
