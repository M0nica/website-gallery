import fetch from "isomorphic-unfetch";

const Index = ({ websites }) => (
  <div
    style={{
      color: `var(--primary-headline)`
    }}
  >
    <h1>MONICA*S INSPIRATION GALLERY</h1>
    <p style={{ color: `var(--accent)` }}>
      a collection of sites around the world wide web 🌏 that have inspired
      me...
    </p>
    <div id="flexContainer">
      {websites.length > 0 &&
        websites.map((url, i) => (
          <div className="websiteCard" key={`${url.name}-card`}>
            <div key={url.name} className="title">
              {" "}
              {url.name}
            </div>

            <div key={i}>
              <a href={url.address}>
                {url.address}

                <div
                  style={{
                    backgroundColor: `var(--grey)`,
                    textAlign: `left`,
                    marginTop: `1em`
                  }}
                >
                  {url.colors.sort().map(color => (
                    <div
                      style={{
                        backgroundColor: color,
                        display: `inline-block`,
                        borderRadius: `50%`,
                        width: `15px`,
                        height: `15px`,
                        margin: `.5em`
                      }}
                    >
                      {" "}
                      &nbsp;
                    </div>
                  ))}
                </div>

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
          color: var(--secondary-headline);
        }
        .websiteCard {
          width: 26%;
          padding: 1em;
          margin: 20px;
          background-color: var(--light-background);
        }

        .websiteCard:nth-child(odd):hover {
          border: 5mm ridge var(--accent);
        }
        .websiteCard:nth-child(even):hover {
          border: 5mm ridge var(--secondary-headline);
        }
        ,
        img {
          width: 100%;
        }

        a {
          text-decoration: none;
          color: var(--accent);
          font-size: 1.2em;
        }

        a:hover {
          opacity: 0.6;
        }
        @media (max-width: 992px) {
          .websiteCard {
            width: 40%;
          }
        }
        @media (max-width: 768px) {
          #flexContainer {
            flex-direction: column;
            justify-content: center;
          }
          .websiteCard {
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
    body: JSON.stringify({
      query: "{ websites { name, address, photo, colors } }"
    })
  });

  const {
    data: { websites }
  } = await response.json();

  return { props: { websites } };
}

export default Index;
