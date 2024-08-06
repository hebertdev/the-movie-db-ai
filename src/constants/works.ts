import movies from "assets/portfolio/all_projects/movies_dark.webp";
import infojobs from "assets/portfolio/all_projects/infojobs.webp";
import movies_react from "assets/portfolio/all_projects/movies.webp";
import baterias from "assets/portfolio/all_projects/baterias.webp";
import tavas from "assets/portfolio/all_projects/tavas.webp";
import dashboard from "assets/portfolio/all_projects/dashboard.webp";
import pokedex from "assets/portfolio/all_projects/pokedex.webp";
import clonstagram from "assets/portfolio/all_projects/clonstagram.webp";
import covid from "assets/portfolio/all_projects/covid19.webp";
import nialtev from "assets/portfolio/all_projects/nialtev.webp";
import ga_store from "assets/portfolio/all_projects/gastore.webp";

export const projects = [
  {
    id: 1239,
    name: "ONLINE STORE - NEXT.JS",
    description:
      "Web application for an online store built with Next.js for the frontend and Django for the backend.",
    image: ga_store.src,
    github: "",
    demo: "https://ga.com.pe/",
  },
  {
    id: 1232,
    name: "MOVIES - HEBERTDEV",
    description:
      "Movie application developed in Next.js that allows users to save their favorite movies and watch trailers, using the TheMovieDB API and supporting both English and Spanish language.",
    image: movies.src,
    github: "https://github.com/hebertdev/hebertdev_movies",
    demo: "https://movies.hebertdev.net/",
  },
  {
    id: 1212,
    name: "INFOJOBS - HACKATHON",
    description:
      "CareerUp es una plataforma de búsqueda de empleo inteligente diseñada para ayudarte a avanzar en tu carrera. Con características innovadoras y el uso de IA",
    image: infojobs.src,
    github: "https://github.com/hebertdev/infojobs",
    demo: "https://infojobs.hebertdev.net/",
    play: "https://youtu.be/JqZHRVc7rfI?si=4yYpw85A0XDVK5GT",
  },
  {
    id: 122,
    name: "MOVIEDB APP - REACT ",
    description:
      "Application created with React and Material UI, which consumes TheMovieDB API, is to teach how to use these technologies on my youtube channel",
    image: movies_react.src,
    github: null,
    demo: "https://themoviedbdev.netlify.app/",
  },
  {
    id: 20,
    name: "BATERIAS DELIVERY AREQUIPA",
    description:
      "Landing page for batteries delivery arequipa, website built in django, html, css, javascript and vue",
    image: baterias.src,
    github: null,
    demo: "https://www.bateriasarequipadelivery.com/",
  },
  // {
  //   id: 3,
  //   name: "ONLINE STORE ",
  //   description:
  //     "Web application (Online Store), built with next js. The whole backend is built with django and django rest framework.",
  //   image: tavas.src,
  //   github: null,
  //   demo: "https://tavas.netlify.app/",
  // },
  // {
  //   id: 4,
  //   name: "ONLINE STORE - DASHBOARD ",
  //   description: `online store admin panel - integrated in django -
  //           demo: {
  //           user: admin@gmail.com,
  //           password: facebook123
  //           }`,
  //   image: dashboard.src,
  //   github: null,
  //   demo: "https://tavas.pythonanywhere.com/",
  // },
  {
    id: 2,
    name: "POKEDEX APP - REACT.JS ",
    description:
      "Pokédex application This project is a Frontend application of example showing how to use REACT-QUERY for the data collection. The app uses React.js as a framework and Pure CSS to build the styles. And it's consuming data from PokéAPI",
    image: pokedex.src,
    github: null,
    demo: "https://pokedexquery.netlify.app/",
  },
  {
    id: 1,
    name: "CLONSTAGRAM APP - 2021",
    description:
      "Application built from a single page in React.js with all the features of a CRUD, with a RestFull API integrated in django and using axios for data consumption.",
    image: clonstagram.src,
    github: "https://github.com/hebertdev/clonstagram",
    demo: "https://persgram.netlify.app/",
  },
  {
    id: 10,
    name: "COVID 19 ALL - 2020",
    description: `An information application about covid-19 in the world. Built with nuxt.js and vue.js, the data comes from Johns Hopkins CSSE.`,
    image: covid.src,
    github: "https://github.com/hebertdev/covid19-stats-app",
    demo: "https://covid19all.netlify.app/",
  },
  {
    id: 9,
    name: "NIALTEV SHOP - 2020",
    description: `app built with django framework, html, css, vanilla js. you are using the Google Maps API services.
            The application is an ecommerce for small businesses, it helps control inventory and online sales.
            It is one of my first complex apps.`,
    image: nialtev.src,
    github: null,
    demo: "https://nialtev.pythonanywhere.com/",
  },
];
