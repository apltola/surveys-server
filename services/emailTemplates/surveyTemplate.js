const config = require('../../config');

module.exports = (survey) => {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <style>
        body {
          margin: 0;
          font-family: Avenir, Helvetica, Arial, sans-serif;
        }
        .container {
          min-height: 100vh;
          position: relative;
          background-color: #f7f7f7;
        }
        .content {
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          max-width: 600px;
          margin: 3vh auto;
          padding: 2vh 3vw;
          background-color: white;
          text-align: center;
        }
        .email-body {
          padding-top: 1vh;
          font-size: 20px;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        a:active {
          color: inherit;
        }
        button {
          cursor: pointer;
          padding: 8px 16px;
          box-shadow: none;
          background: transparent;
          border: 1px solid rgba(27, 31, 35, 0.15);
          border-radius: 5px;
          margin: 5px 10px;
          font-size: 16px;
          font-weight: 500;
          box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
        }
        .btn-text {
          margin-right: 6px;
        }
      </style>
      <body>
        <div class="container">
          <div class="content">
            <h2>${survey.title}</h2>
            <p class="email-body">${survey.body}</p>
            <button>
              <a href='${config.redirectDomain}/api/surveys/${survey.id}/yes'>
                <span class="btn-text">Yes</span> 👍
              </a>
            </button>
            <button>
              <a href='${config.redirectDomain}/api/surveys/${survey.id}/no'>
                <span class="btn-text">No</span> 👍
              </a>
            </button>
          </div>
        </div>
      </body>
    </html>
  `;
};
