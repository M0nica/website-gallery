import fetch from "isomorphic-unfetch";

const Index = ({ websites }) => (
  <>
    <h1>Website Gallery</h1>
    <div id="flexContainer">
      {websites.length > 0 &&
        websites.map((url, i) => (
          <div className="website" key={`${url.name}-card`}>
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
