# Website Gallery

A digital collection of websites around the world-wide web that have inspired me. 

<img src="https://github.com/M0nica/website-gallery/blob/master/public/Screen%20Shot%202020-04-02%20at%209.44.42%20AM.png?raw=true" alt="screenshot of https://website-gallery.now.sh/">

## Technologies
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app). The application has a GraphQL endpoint that when given a [list of websites](https://github.com/M0nica/website-gallery/blob/master/pages/api/data/websites.yml), generates screenshots and returns the screenshots along with descriptions of the site. The NPM package [`get-image-colors`](https://www.npmjs.com/package/get-image-colors) and [`capture-website`](https://www.npmjs.com/package/capture-website) are used to generate screenshot from websites and the main colors of a site. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Contribute a Website
Currently, the list of websites featured in the gallery is in [websites.yml](https://github.com/M0nica/website-gallery/blob/master/pages/api/data/websites.yml). If you'd like to submit a website for consideration you can open a pull request here. 

## 🍴 Fork This Project
If you are forking this to create your own `website-gallery` then you should replace the data in the [websites.yml](https://github.com/M0nica/website-gallery/blob/master/pages/api/data/websites.yml) to reflect the websites you would like to feature.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Note: Currently there is a bug 🐛 where images are only generated locally. In order to deploy a functional site whenever adding additional sites the the site should either be deployed from CLI after running locally and visiting the homepage OR with CI/CD after committing newly generated images to version control. 
