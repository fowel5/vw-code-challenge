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

## Branches

I am using a GitFlow approach, where I have my develop branch named "dev" and from there, I create other branches to fullfil a task. After being done I create a pull-request, review it and merge it back into dev. As soon as I see a version worth showing, I will push the dev state into main.

TODO: Create github action after push on main, which triggers a deployment on Github Pages.

Also I use conventional commits and conventional branches to have better structured namings.

## Problems

I will list here the problems I have been facing since starting this project.

- Tailwind Version: Somehow the latest Tailwind version was not compatible with the version I was trying to use from Vite+React. I had the luck, that it was already in work and some tailwind contributor purposed a solution on https://github.com/tailwindlabs/tailwindcss/issues/18381#issuecomment-3001151427.
