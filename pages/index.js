import fetch from "isomorphic-unfetch";
import colors from "../styles/colors";

const Index = ({ websites }) => (
  <div
    style={{
      textAlign: `center`,
      color: colors.primaryHeadline,
      fontSize: `16px`,
      fontFamily: "Arial"
    }}
  >
    <h1>MONICA*S INSPIRATION GALLERY</h1>
    <p style={{ color: colors.accent }}>
      a collection of sites around the world wide web 🌏 that have inspired
      me...
    </p>
    <div id="flexContainer">
      {websites.length > 0 &&
        websites.map((url, i) => (
          <div className="website" key={`${url.name}-card`}>
            <div key={url.name} className="title">
              {" "}
              {url.name}
            </div>
            <div key={i}>
              <a href={url.address}>
                {url.address}
                <img src={url.photo} alt={url.name} />
              </a>
            </div>
          </div>
        ))}
      <style jsx>{`
        #flexContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .title {
          font-weight: bold;
          font-size: 1.5em;
          color: ${colors.secondaryHeadline};
        }
        .website {
          width: 30%;
          padding: 1em;
          margin: 20px;
        }
        .website:nth-child(odd),
        .website:nth-child(even) {
          background-color: ${colors.lightBackground};
        }
        ,
        img {
          width: 100%;
        }

        h1,
        a {
          font-family: "Arial";
        }

        a {
          text-decoration: none;
          color: ${colors.accent};
          font-size: 1.2em;
        }

        a:hover {
          opacity: 0.6;
        }
        @media (max-width: 992px) {
          .website {
            width: 40%;
          }
        }
        @media (max-width: 768px) {
          #flexContainer {
            flex-direction: column;
            justify-content: center;
          }
          .website {
            width: 90%;
          }
        }
      `}</style>
    </div>
  </div>
);

export async function getServerSideProps({ req }) {
  const protocol = req.protocol ? req.protocol : `http`;
  const base_url = `${protocol}://${req.headers.host}`;

  const response = await fetch(`${base_url}/api/graphql`, {
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

export default Index;
