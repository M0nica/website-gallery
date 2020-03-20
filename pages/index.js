import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Index = ({ websites }) => (
  <>
    <h1>Website Gallery</h1>
    <div id="flexContainer">
      {websites.map((url, i) => (
        <div className="website">
          <div key={url.name} className="title">
            {" "}
            {url.name}
          </div>
          <div key={i}>
            <a href={url.address}>{url.address}</a>
          </div>
          <img src={url.photo} alt={url.name} />
        </div>
      ))}
      <style jsx>{`
        #flexContainer {
          display: flex;
          flex-wrap: wrap;
        }
        .title {
          font-weight: bold;
        }
        .website {
          width: 50%;
        }
        ,
        img {
          width: 100%;
        }
        ,
        // .website:nth-child(even) {
        //   background-color: #feeeff;
        // }
        ,
        h1,
        a {
          font-family: "Arial";
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
  </>
);

export async function getStaticProps(context) {
  const response = await fetch(`http://localhost:3000/api/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ query: "{ websites { name, address, photo } }" })
  });
  const {
    data: { websites }
  } = await response.json();

  return { props: { websites } };
}

// Index.getInitialProps = async () => {
//   const response = await fetch("http://localhost:3000/api/graphql", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify({ query: "{ websites { name, address, photo } }" })
//   });

//   const {
//     data: { websites }
//   } = await response.json();

//   return { websites };
// };

export default Index;
