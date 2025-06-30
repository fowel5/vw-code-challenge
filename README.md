# Code Challenge

This is a project for a code challenge for the company VW. It was scaffolded using `npm create vite@latest` and following best practices.

## Technologies

- React: It was the required library.
- Vite: I wanted to use a fast bundler with hot module replacement and create a blank react app (I would have evaluated create-react-app if it was not deprecated).
- TailwindCSS: I do like more CSSinJS libraries like styled-components, but with no SSR I have already experienced problems with layout shifts and delayed loads. I think Tailwind is pretty efficient and lightweight, that is the reason I chose it for.
- Vitest: If I use Vite, I will of course use Vitest and not Jest (which I could have done).
- Eslint & Prettier: I chose Eslint just because I am more familiar with it, which the pre config from Vite and few rules, that I prefer. I also added prettier with few preferences of mine.
- Github Actions: Since we are here on Github, I prefer to keep it simple with Github Actions (having it easy, to potentially deploy it to a Github Page) and not complicate my life with Jenkins (I have somehow bad memorias with Jenkins in the University).

## Installation

In order to run this project you will need `node >= 22.12.0` and `npm >= 6.14.16`. You just have to clone the project, go to the folder 'vw-code-challenge' and execute `npm i`. Then just `npm run dev`.

If you want to execute the prod version of the application, you can do it with: `npm run start:prod` and visiting the page: http://localhost:8080/

## Branches

I am using a GitFlow approach, where I have my develop branch named "dev" and from there, I create other branches to fullfil a task. After being done I create a pull-request, review it and merge it back into dev. As soon as I see a version worth showing, I will push the dev state into main.

Would have been nice: Create github action after push on main, which triggers a deployment on Github Pages.

Also I use conventional commits and conventional branches to have better structured namings.

## Problems

I will list here the problems I have been facing since starting this project.

- Tailwind Version: Somehow the latest Tailwind version was not compatible with the version I was trying to use from Vite+React. I had the luck, that it was already in work and some tailwind contributor purposed a solution on https://github.com/tailwindlabs/tailwindcss/issues/18381#issuecomment-3001151427.

- Edit Page had not the student to edit on reload: I will explain it better on the technical_decissions.md, but this behaviour is not acceptable and I had to fix it, which I did in https://github.com/fowel5/vw-code-challenge/pull/31.

- The buttons on the student form must have a disabled type: I had a struggle looking for a way to disable the button, whenever the student to create was not fully set or whenever the student to update did not change. The real problem was, that I handled the mark as a Number, but when I parse a void string `''` to a number, the result is 0. So, it was set without being set somehow, I fixed it also in https://github.com/fowel5/vw-code-challenge/pull/31.

- The local TS server did not want to work with cypress, vitest and the same config file. After editing the config file forwards and backwards, I just created a new one just for cypress and now both are recognized. This was fixed in https://github.com/fowel5/vw-code-challenge/pull/32.

- The jsonserver version I was using handled IDs as strings: While I was developing, I realized the jsonserver did not deliver the IDs as numbers (I gave him the IDs as numbers), but as strings. Whenever I set a new student, it just generated a hexadecimal ID. I wanted to fix it by setting a middleware, which catches the request, gets the IDs of the other students and adds a +1 to the new one, but the version of jsonserver did not accept middlewares (but the actual one do). This was fixed in https://github.com/fowel5/vw-code-challenge/pull/14

- The page rerendered when I did some changes in the API. This is because the jsonserver is in the project folder, and whenever Vite detects a change in a file of the project, it reload the page. This was fixed in https://github.com/fowel5/vw-code-challenge/pull/15.
